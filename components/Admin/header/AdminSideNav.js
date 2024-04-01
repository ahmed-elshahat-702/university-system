import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faRankingStar,
  faSquarePollVertical,
  faTableList,
  faTriangleExclamation,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const AdminSideNav = ({ loading, sidebarOpen, activePage, setActivePage }) => {
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
      className={`bg-white shadow-sm relative md:fixed top-0 w-full h-full md:w-[240px] mt-[70px] md:flex ${
        sidebarOpen ? "flex" : "hidden"
      }`}
    >
      <div className="container mx-auto py-4 px-2">
        {sideNavLinks.map((link) => (
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded-md ${
              activePage === link.id
                ? "text-white bg-blue-600"
                : "text-gray-900 hover:bg-blue-100"
            }`}
            onClick={() => {
              setActivePage(link.id);
              setActiveIcon(link.icon);
            }}
            key={link.id}
          >
            {loading ? (
              <>
                <div className="animate-pulse rounded-full bg-gray-200 h-5 w-5 mr-2"></div>
                <div className="animate-pulse rounded bg-gray-200 h-4 w-32 ml-2"></div>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={link.icon}
                  className={`h-5 w-5 mr-2 ${
                    activeIcon === link.icon ? "text-white" : "text-gray-900"
                  }`}
                />
                <span className="ml-2">{link.name}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default AdminSideNav;
