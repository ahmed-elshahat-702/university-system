"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import UserNavbar from "@/components/User/UserNavbar";
import UserSideNav from "@/components/User/UserSideNav";
import ChangePasswordModal from "@/components/User/ChangePasswordModal";
import "@/styles/Loading.css";
import "./style.css";

const Page = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/user/${id}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        Swal.fire(
          "Error",
          "Failed to fetch user details. Please try again later.",
          "error"
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setdropDownOpen(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setOldPassword("");
    setNewPassword("");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `/api/user/${userData._id}/change-password`,
        {
          oldPassword,
          newPassword,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Password changed successfully",
          icon: "success",
        });
        setOldPassword("");
        setNewPassword("");
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
      });
      setLoading(false);
    }
  };

  const handleToggleDropdown = () => {
    setdropDownOpen(!dropDownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setdropDownOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("userData");
        router.push("/");
      }
    });
  };

  const renderUserData = (sectionTitle, sectionData) => {
    return (
      <div className="mb-4 last:mb-0">
        <h5 className="folder-title relative text-blue-600 font-semibold bg-white w-fit px-3 rounded-t">
          {sectionTitle}
        </h5>
        <div className="bg-white p-3 rounded rounded-ss-none">
          <ul className="list-group">
            {loading ? (
              <>
                <li className="list-group-item animate-pulse bg-slate-100 p-2 mb-2 last:mb-0 rounded">
                  <div className="skeleton-line w-3/4 h-4 rounded"></div>
                </li>
                <li className="list-group-item animate-pulse bg-slate-100 p-2 mb-2 last:mb-0 rounded">
                  <div className="skeleton-line w-1/2 h-4 rounded"></div>
                </li>
                <li className="list-group-item animate-pulse bg-slate-100 p-2 mb-2 last:mb-0 rounded">
                  <div className="skeleton-line w-1/2 h-4 rounded"></div>
                </li>
                <li className="list-group-item animate-pulse bg-slate-100 p-2 mb-2 last:mb-0 rounded">
                  <div className="skeleton-line w-1/2 h-4 rounded"></div>
                </li>
                <li className="list-group-item animate-pulse bg-slate-100 p-2 mb-2 last:mb-0 rounded">
                  <div className="skeleton-line w-1/2 h-4 rounded"></div>
                </li>
                <li className="list-group-item animate-pulse bg-slate-100 p-2 mb-2 last:mb-0 rounded">
                  <div className="skeleton-line w-1/2 h-4 rounded"></div>
                </li>
              </>
            ) : (
              sectionData &&
              Object.entries(sectionData).map(([key, value]) => (
                <li
                  key={key}
                  className="list-group-item bg-slate-100 p-2 mb-2 last:mb-0 rounded"
                >
                  <span className="me-2 font-semibold">{key}:</span>
                  <span>{value}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="user-page">
      <header>
        <div className="container-fluid">
          <UserNavbar
            loading={loading}
            fullName={userData.userData?.fullName}
            email={userData.userContactData?.email}
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
            handleToggleDropdown={handleToggleDropdown}
            dropDownOpen={dropDownOpen}
            handleShowModal={handleShowModal}
            dropdownRef={dropdownRef}
          />
        </div>

        <UserSideNav sidebarOpen={sidebarOpen} id={id} />
      </header>
      <main className="bg-gray-100">
        <div className={`md:ps-[240px] ${sidebarOpen ? "" : "pt-[70px]"} `}>
          <div className="main-page">
            <div className="page student-page p-3" id="student">
              <div className="student-main-info bg-white border border-gray-200 shadow-lg rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <h6 className="text-xs text-gray-500 mb-1">Faculty of</h6>
                  <h4 className="text-lg font-semibold text-blue-600">
                    Nursing
                  </h4>
                </div>
                <div className="flex flex-col items-center">
                  <h6 className="text-xs text-gray-500 mb-1">Grade</h6>
                  <h4 className="text-lg font-semibold text-blue-600">2</h4>
                </div>
                <div className="flex flex-col items-center">
                  <h6 className="text-xs text-gray-500 mb-1">Total GPA</h6>
                  <h4 className="text-lg font-semibold text-blue-600">3.18</h4>
                </div>
              </div>

              <div className="student-secondary-info w-full mt-3">
                {userData && (
                  <>
                    <div className="mb-3 flex items-center gap-2">
                      <h2>Welcome,</h2>
                      {loading ? (
                        <div className="animate-pulse skeleton-line w-40 h-4 bg-slate-200 rounded"></div>
                      ) : (
                        <span className="text-blue-600 font-bold">
                          {userData.userData?.fullName}
                        </span>
                      )}
                    </div>
                    {renderUserData("User Data", userData.userData)}
                    {renderUserData(
                      "User Family Data",
                      userData.userFamilyData
                    )}
                    {renderUserData(
                      "User Contact Data",
                      userData.userContactData
                    )}
                    {renderUserData(
                      "User Previous Qualification Data",
                      userData.userPreviousQualificationData
                    )}
                    {renderUserData(
                      "In The Event Of Transferring To Another College Or Institute",
                      userData.InTheEventOfTransferringToAnotherCollegeOrInstitute
                    )}
                    {renderUserData(
                      "The Specialty He Wishes To Join",
                      userData.TheSpecialtyHeWishesToJoin
                    )}
                  </>
                )}
              </div>
            </div>
            {/* <div className="page exams-page hidden" id="exams">
                            <h4>exams</h4>
                        </div>
                        <div className="page survey-page hidden" id="survey">
                            <h4>survey</h4>
                        </div>
                        <div className="page result-page hidden" id="result">
                            <h4>result</h4>
                        </div>
                        <div className="page warning-page hidden" id="warning">
                            <h4>warning</h4>
                        </div>
                        <div className="page wallet-page hidden" id="wallet">
                            <h4>wallet</h4>
                        </div>
                        <div className="page cash-page hidden" id="cash">
                            <h4>cash</h4>
                        </div>
                        <div className="page settings-page hidden" id="settings">
                            <h4>settings</h4>
                        </div> */}
          </div>
        </div>
      </main>
      {showModal && (
        <ChangePasswordModal
          handleChangePassword={handleChangePassword}
          handleCloseModal={handleCloseModal}
          oldPassword={oldPassword}
          setOldPassword={(e) => setOldPassword(e.target.value)}
          newPassword={newPassword}
          setNewPassword={(e) => setNewPassword(e.target.value)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Page;
