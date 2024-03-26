import Link from "next/link";

import {
    faMoneyBill,
    faRankingStar,
    faSquarePollVertical,
    faTableList,
    faTriangleExclamation,
    faUser,
    faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserSideNav = ({ sidebarOpen, id, handleNavigation }) => {
    const handleLinkClick = (route) => {
        handleNavigation(route);
    };
    const sideNavLinks = [
        {
            id: "student-data",
            name: "Student Data",
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
            className={`bg-white shadow-sm relative md:fixed top-0 w-full h-full md:w-[240px] mt-[70px] 
                            md:flex 
                ${sidebarOpen ? "flex" : "hidden"}
                `}
        >
            {/* <Link href="/student-data/[id]" as="/student/exams"></Link> */}
            <div className="container mx-auto py-4 px-2">
                {sideNavLinks.map((link) => (
                    <button
                        key={link.id}
                        className="w-full text-start py-2 px-4 mb-2 rounded-md text-gray-900 hover:bg-gray-100"
                        onClick={() =>
                            handleLinkClick(`/user/${id}/${link.id}`)
                        }
                    >
                        <FontAwesomeIcon
                            icon={link.icon}
                            className="h-5 w-5 mr-2"
                        />
                        <span className="ml-2">{link.name}</span>
                    </button>
                ))}
                {/* <a
                    href="#student"
                    className="block py-2 px-4 mb-2 rounded-md text-gray-900 hover:bg-gray-100"
                >
                    <FontAwesomeIcon icon={faUser} className="h-5 w-5 mr-2" />
                    <span className="ml-2">Student Data</span>
                </a>
                <a
                    href="#examsTable"
                    className="block py-2 px-4 mb-2 rounded-md text-gray-900 hover:bg-gray-100"
                >
                    <FontAwesomeIcon
                        icon={faTableList}
                        className="h-5 w-5 mr-2"
                    />
                    <span className="ml-2">Exams Table</span>
                </a>
                <a
                    href="#survey"
                    className="block py-2 px-4 mb-2 rounded-md text-gray-900 hover:bg-gray-100"
                >
                    <FontAwesomeIcon
                        icon={faSquarePollVertical}
                        className="h-5 w-5 mr-2"
                    />
                    <span className="ml-2">Survey</span>
                </a>
                <a
                    href="#result"
                    className="block py-2 px-4 mb-2 rounded-md text-gray-900 hover:bg-gray-100"
                >
                    <FontAwesomeIcon
                        icon={faRankingStar}
                        className="h-5 w-5 mr-2"
                    />
                    <span className="ml-2">Result</span>
                </a>
                <a
                    href="#warning"
                    className="block py-2 px-4 mb-2 rounded-md text-gray-900 hover:bg-gray-100"
                >
                    <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        className="h-5 w-5 mr-2"
                    />
                    <span className="ml-2">Warning</span>
                </a>
                <a
                    href="#wallet"
                    className="block py-2 px-4 mb-2 rounded-md text-gray-900 hover:bg-gray-100"
                >
                    <FontAwesomeIcon icon={faWallet} className="h-5 w-5 mr-2" />
                    <span className="ml-2">Wallet</span>
                </a>
                <a
                    href="#cash"
                    className="block py-2 px-4 mb-2 rounded-md text-gray-900 hover:bg-gray-100"
                >
                    <FontAwesomeIcon
                        icon={faMoneyBill}
                        className="h-5 w-5 mr-2"
                    />
                    <span className="ml-2">Cash</span>
                </a>
                <a
                    href="#settings"
                    className="block py-2 px-4 mb-2 rounded-md text-gray-900 hover:bg-gray-100"
                >
                    <FontAwesomeIcon icon={faGear} className="h-5 w-5 mr-2" />
                    <span className="ml-2">Settings</span>
                </a> */}
            </div>
        </aside>
    );
};

export default UserSideNav;
