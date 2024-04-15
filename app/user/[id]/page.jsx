"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import UserNavbar from "@/components/User/header/UserNavbar";
import UserSideNav from "@/components/User/header/UserSideNav";
import {
  StudentData,
  Wallet,
  Survey,
  Payments,
  Ranking,
  Result,
  ExamsTable,
} from "@/components/User/main";
import LoadingButton from "@/components/LoadingButton";
import { useRouter } from "next/navigation";

const UserDetailsPage = ({ params }) => {
  const { id } = params;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("student-data");
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const userData = sessionStorage.getItem("UserData");
    if (!userData) {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
        text: "You need to login to see your data",
        willClose: () => {
          router.push("/");
        },
      });
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/user/${id}`);
      setUserData(response.data);
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to fetch user details. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <UserNavbar
          id={id}
          toggleSidebar={() =>
            setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen)
          }
          loading={loading}
          cancleLoading={() => setLoading(false)}
          setLoading={() => setLoading(true)}
        />
        <UserSideNav
          loading={loading}
          sidebarOpen={sidebarOpen}
          activePage={activePage}
          setActivePage={setActivePage}
          collapsed={collapsed}
          setCollapsed={() => setCollapsed(!collapsed)}
        />
      </header>
      <main
        className={`w-full flex justify-end h-full ${loading ? "p-2" : ""}`}
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
            (activePage === "student-data" && (
              <div className="students-page h-full">
                <div className="container mx-auto sm:px-4 max-w-full p-7">
                  <StudentData loading={loading} userData={userData} />
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

export default UserDetailsPage;
