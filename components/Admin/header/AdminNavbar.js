import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AdminNavbar = ({ toggleSidebar }) => {
  const router = useRouter();

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
        sessionStorage.removeItem("AdminData");
        router.push("/");
      }
    });
  };

  return (
    <nav className="bg-white shadow w-full fixed top-0 flex justify-between items-center h-[70px] px-2 z-50">
      <button className="focus:outline-none md:hidden" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
      </button>
      <div className="brand hidden md:inline-block">
        <h3>NINU</h3>
        <h6 className="text-body-secondary">university system</h6>
      </div>
      <div className="middle-part flex flex-col items-center">
        <div className="font-bold">Admin Dashboard</div>
      </div>
      <div className="right-part flex gap-2">
        <button
          className="py-2 px-4 block whitespace-no-wrap text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
