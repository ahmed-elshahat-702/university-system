import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faMoneyBill,
  faRankingStar,
  faSquarePollVertical,
  faTableList,
  faTriangleExclamation,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const AdminSideNav = ({
  loading,
  sidebarOpen,
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
}) => {
  const [activeIcon, setActiveIcon] = useState(faUser);

  const sideNavLinks = [
    {
      id: "students",
      name: "Students",
      icon: faUser,
    },
    {
      id: "exams-table",
      name: "Exams Table",
      icon: faTableList,
    },
    {
      id: "survey",
      name: "Survey",
      icon: faSquarePollVertical,
    },
    {
      id: "payments",
      name: "Payments",
      icon: faMoneyBill,
    },
    {
      id: "ranking",
      name: "Ranking",
      icon: faRankingStar,
    },
    {
      id: "result",
      name: "Result",
      icon: faTriangleExclamation,
    },
    {
      id: "wallet",
      name: "Wallet",
      icon: faWallet,
    },
  ];

  return (
    <aside
      className={`bg-lighter dark:bg-darker border-r border-light dark:border-dark shadow dark:shadow-dark relative md:fixed top-0 w-full h-full transition-all ease-in-out duration-300 ${
        collapsed ? " md:w-1/12" : "md:w-1/5"
      } mt-[70px] md:flex ${sidebarOpen ? "flex" : "hidden"}`}
    >
      <div className="container mx-auto py-4 px-2">
        <button
          className=" w-10 hidden absolute top-1 -right-10 py-2 mb-2 md:flex justify-center rounded-r-md bg-darker text-lighter dark:bg-lighter dark:text-darker hover:bg-dark dark:hover:bg-light"
          onClick={setCollapsed}
        >
          {loading ? (
            <>
              <div className="animate-pulse rounded-full bg-dark h-5 w-5 mr-2"></div>
            </>
          ) : (
            <FontAwesomeIcon
              icon={collapsed ? faAngleDoubleRight : faAngleDoubleLeft}
            />
          )}
        </button>
        {sideNavLinks.map((link) => (
          <button
            className={`w-full flex items-center ${
              collapsed ? "md:justify-center" : ""
            } py-2 px-4 mb-2 rounded-md ${
              activePage === link.id
                ? " bg-dark-blue text-lighter"
                : " hover:bg-light-blue"
            }`}
            onClick={() => {
              setActivePage(link.id);
              setActiveIcon(link.icon);
            }}
            key={link.id}
          >
            {loading ? (
              <>
                <div className="animate-pulse rounded-full bg-dark h-5 w-5 mr-2"></div>
                <div className="animate-pulse rounded bg-dark h-4 w-32 ml-2"></div>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={link.icon}
                  className={`h-5 w-5 ${collapsed ? "" : "mr-2"}}
                    ${activeIcon === link.icon ? "text-lighter" : ""}`}
                />
                <span
                  className={`ml-2 whitespace-nowrap ${
                    collapsed ? "md:hidden" : ""
                  }`}
                >
                  {link.name}
                </span>
              </>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default AdminSideNav;
