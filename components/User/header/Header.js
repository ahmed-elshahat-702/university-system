import { useCallback } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import UserNavbar from "./UserNavbar";
import UserSideNav from "./UserSideNav";

const Header = ({ id, sidebarOpen, setSidebarOpen }) => {
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
  }, [setSidebarOpen]);

  return (
    <>
      <UserNavbar id={id} toggleSidebar={toggleSidebar} />
      <ChangePasswordModal id={id} />
      <UserSideNav
        id={id}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </>
  );
};

export default Header;
