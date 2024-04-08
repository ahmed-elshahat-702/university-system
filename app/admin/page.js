"use client";

import { useEffect, useState } from "react";

import LoadingButton from "@/components/LoadingButton";

import {
  Students,
  Wallet,
  Survey,
  Payments,
  Ranking,
  Result,
  ExamsTable,
  AdminNavbar,
  AdminSideNav,
} from "@/components/Admin";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [, setDeletedUser] = useState(null);
  const [activePage, setActivePage] = useState("students");
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  const getUsers = async () => {
    try {
      const response = await axios.get("api/users");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch users. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminData = sessionStorage.getItem("AdminData");
    if (!adminData) {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
        text: "You need to login to access the admin page",
        willClose: () => {
          router.push("/");
        },
      });
    } else {
      getUsers();
    }
  }, []);

  const deleteUser = async (id) => {
    let deletedUser;

    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/admin/delete-user/${id}`).then(async () => {
          const userToDelete = await users.find((user) => user._id === id);
          deletedUser = userToDelete;
          setDeletedUser(userToDelete);
          getUsers();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User deleted successfully!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Undo",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await axios
                .post("/api/admin/add-user", deletedUser)
                .then(() => {
                  setDeletedUser(null);
                  getUsers();
                  Swal.fire({
                    icon: "success",
                    title: "Undo Successful",
                    text: "User has been restored!",
                  });
                })
                .catch((error) => {
                  console.error("Error adding user:", error);
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to undo deletion. Please try again later.",
                  });
                });
            }
          });
        });
      }
    });
  };

  return (
    <>
      <header>
        <AdminNavbar
          toggleSidebar={() =>
            setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen)
          }
        />
        <AdminSideNav
          activePage={activePage}
          loading={loading}
          setActivePage={setActivePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          collapsed={collapsed}
          setCollapsed={() => setCollapsed(!collapsed)}
        />
      </header>
      <main
        className={`bg-gray-100 w-full flex justify-end h-full ${
          loading ? "p-2" : ""
        }`}
      >
        <div
          className={`w-full transition-all ease-in-out duration-300 ${
            collapsed ? "md:w-11/12" : "md:w-4/5"
          }  ${sidebarOpen ? "pt-0 md:pt-[75px]" : "pt-[75px]"} `}
        >
          {loading ? (
            <div className="absolute top-20 left-1/2">
              <LoadingButton />
            </div>
          ) : (
            (activePage === "students" && (
              <div className="students-page h-full">
                <div className="container mx-auto sm:px-4 max-w-full p-7">
                  <Students
                    deleteUser={deleteUser}
                    users={users}
                    setFilteredUsers={setFilteredUsers}
                    filteredUsers={filteredUsers}
                  />
                </div>
              </div>
            )) ||
            (activePage === "exams-table" && (
              <div className="page exams-page p-3" id="exams">
                <div className="container mx-auto sm:px-4 max-w-full p-7">
                  <ExamsTable />
                </div>
              </div>
            )) ||
            (activePage === "result" && (
              <div className="page exams-results-page p-3" id="exams-results">
                <div className="container mx-auto sm:px-4 max-w-full p-7">
                  <Result />
                </div>
              </div>
            )) ||
            (activePage === "ranking" && (
              <div className="page ranking-page p-3" id="ranking">
                <div className="container mx-auto sm:px-4 max-w-full p-7">
                  <Ranking />
                </div>
              </div>
            )) ||
            (activePage === "survey" && (
              <div className="page survey-page p-3" id="survey">
                <div className="container mx-auto sm:px-4 max-w-full p-7">
                  <Survey />
                </div>
              </div>
            )) ||
            (activePage === "payments" && (
              <div className="page payment-page p-3" id="payments">
                <div className="container mx-auto sm:px-4 max-w-full p-7">
                  <Payments />
                </div>
              </div>
            )) ||
            (activePage === "wallet" && (
              <div className="page wallet-page p-3" id="wallet">
                <div className="container mx-auto sm:px-4 max-w-full p-7">
                  <Wallet />
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default page;
