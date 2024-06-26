import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ChangePasswordModal from "./ChangePasswordModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const UserNavbar = ({
  id,
  toggleSidebar,
  loading,
  cancleLoading,
  setLoading,
}) => {
  const [userData, setUserData] = useState({});
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const fetchData = async () => {
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
      cancleLoading;
    }
  };

  useEffect(() => {
    loading ? setLoading : fetchData();
  }, [loading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".relative")
      ) {
        setDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderProfileContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center">
          <div className="animate-pulse skeleton-line w-40 h-4 mb-2 bg-dark dark:bg-light rounded"></div>
          <div className="animate-pulse skeleton-line w-56 h-3 mb-2 bg-dark dark:bg-light rounded"></div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center">
          <p className="mb-0">{userData.userData?.fullName}</p>
          <p className="mb-0 font-normal text-s text-dark dark:text-light transition-all">
            {userData.userContactData?.email}
          </p>
        </div>
      );
    }
  };

  const handleToggleDropdown = () => {
    setDropDownOpen((prevState) => !prevState);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setDropDownOpen(false);
  };

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
        sessionStorage.removeItem("UserData");
        router.push("/");
      }
    });
  };

  return (
    <>
      <nav className="bg-lighter dark:bg-darker border-b border-light dark:border-dark shadow dark:shadow-dark w-full fixed top-0 flex justify-between items-center h-[70px] px-2 z-50 transition-all">
        <button
          className="focus:outline-none md:hidden"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>
        <div className="brand hidden md:inline-block">
          <h3 className="text-dark-blue font-bold text-xl">NINU</h3>
          <h6 className="text-dark dark:text-light">university system</h6>
        </div>
        <div className="middle-part flex flex-col items-center">
          <div className="name font-bold">{renderProfileContent()}</div>
        </div>

        <div className="right-part flex gap-2">
          <ThemeSwitcher />
          <div className="relative">
            <button
              className="focus:outline-none hidden-arrow flex items-center"
              type="button"
              onClick={handleToggleDropdown}
            >
              {loading ? (
                <div className="animate-pulse rounded-full bg-light dark:bg-light h-10 w-10"></div>
              ) : (
                <Image
                  src="/profile.png"
                  className="rounded-full"
                  width="50"
                  height="50"
                  alt="Avatar"
                  loading="lazy"
                />
              )}

              <FontAwesomeIcon icon={faCaretDown} className="h-4 w-4 ml-2" />
            </button>
            {dropDownOpen && (
              <ul
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-lighter dark:bg-dark border border-dark dark:border-light rounded-md overflow-hidden shadow transition-all"
              >
                <li>
                  <button
                    className="w-full text-left py-2 px-4 block whitespace-no-wrap border-b hover:bg-light dark:hover:bg-darker"
                    onClick={handleShowModal}
                  >
                    Change Password
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left py-2 px-4 block whitespace-no-wrap hover:bg-light dark:hover:bg-darker"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <div style={{ display: showModal ? "block" : "none" }}>
        <ChangePasswordModal
          id={id}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </>
  );
};

export default UserNavbar;
