"use client";
import { useState } from "react";
import ChangePasswordModal from "@/components/User/header/ChangePasswordModal";
import UserNavbar from "@/components/User/header/UserNavbar";
import UserSideNav from "@/components/User/header/UserSideNav";

const Layout = ({ children, params }) => {
  const { id } = params;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header>
        <UserNavbar
          id={id}
          toggleSidebar={() =>
            setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen)
          }
        />
        <ChangePasswordModal id={id} />
        <UserSideNav
          id={id}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </header>
      <main className="bg-gray-100">
        <div className={`md:ps-[240px] ${sidebarOpen ? "" : "pt-[70px]"} `}>
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
