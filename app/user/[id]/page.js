"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import ChangePasswordModal from "@/components/User/header/ChangePasswordModal";
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

  const renderPageContent = () => {
    switch (activePage) {
      case "student-data":
        return (
          <div className="page student-page p-3" id="student">
            <StudentData loading={loading} userData={userData} />
          </div>
        );
      case "exams-table":
        return (
          <div className="page exams-page p-3" id="exams">
            <ExamsTable />
          </div>
        );
      case "result":
        return (
          <div className="page exams-results-page p-3" id="exams-results">
            <Result />
          </div>
        );
      case "ranking":
        return (
          <div className="page ranking-page p-3" id="ranking">
            <Ranking />
          </div>
        );
      case "survey":
        return (
          <div className="page survey-page p-3" id="survey">
            <Survey />
          </div>
        );
      case "payments":
        return (
          <div className="page payment-page p-3" id="payments">
            <Payments />
          </div>
        );
      case "wallet":
        return (
          <div className="page wallet-page p-3" id="wallet">
            <Wallet />
          </div>
        );
      default:
        return null;
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
        />
      </header>
      <main className={`bg-gray-100 min-h-screen ${loading ? "p-2" : ""}`}>
        <div className={`md:ps-[240px] ${sidebarOpen ? "" : "pt-[70px]"} `}>
          {loading ? <LoadingButton /> : renderPageContent()}
        </div>
      </main>
    </>
  );
};

export default UserDetailsPage;
