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

const page = () => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [, setDeletedUser] = useState(null);
  const [activePage, setActivePage] = useState("students");

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
    getUsers();
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
        />
      </header>
      <main className={`bg-gray-100 h-full ${loading ? "p-2" : ""}`}>
        <div className={`md:ps-[240px] ${sidebarOpen ? "" : "pt-[70px]"} `}>
          {loading ? (
            <LoadingButton />
          ) : (
            (activePage === "students" && (
              <Students
                deleteUser={deleteUser}
                users={users}
                setFilteredUsers={setFilteredUsers}
                filteredUsers={filteredUsers}
              />
            )) ||
            (activePage === "exams-table" && (
              <div className="page exams-page p-3" id="exams">
                <ExamsTable />
              </div>
            )) ||
            (activePage === "result" && (
              <div className="page exams-results-page p-3" id="exams-results">
                <Result />
              </div>
            )) ||
            (activePage === "ranking" && (
              <div className="page ranking-page p-3" id="ranking">
                <Ranking />
              </div>
            )) ||
            (activePage === "survey" && (
              <div className="page survey-page p-3" id="survey">
                <Survey />
              </div>
            )) ||
            (activePage === "payments" && (
              <div className="page payment-page p-3" id="payments">
                <Payments />
              </div>
            )) ||
            (activePage === "wallet" && (
              <div className="page wallet-page p-3" id="wallet">
                <Wallet />
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default page;
