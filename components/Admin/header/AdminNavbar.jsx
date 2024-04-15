import ThemeSwither from "@/components/ThemeSwitcher";
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
    <nav className="bg-lighter dark:bg-darker border-b border-light dark:border-dark shadow dark:shadow-dark w-full fixed top-0 flex justify-between items-center h-[70px] px-2 z-50 transition">
      <button className="focus:outline-none md:hidden" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
      </button>
      <div className="brand hidden md:inline-block">
        <h3 className="text-dark-blue font-bold text-xl">NINU</h3>
        <h6 className="text-dark dark:text-light">university system</h6>
      </div>
      <div className="middle-part flex flex-col items-center">
        <div className="font-bold">Admin Dashboard</div>
      </div>
      <div className="right-part flex gap-2">
        <ThemeSwither />
        <button
          className="py-2 px-4 block whitespace-no-wrap text-light-red border border-light-red rounded hover:bg-light-red hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
