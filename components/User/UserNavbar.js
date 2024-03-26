import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserNavbar = ({
  loading,
  fullName,
  email,
  toggleSidebar,
  handleLogout,
  handleToggleDropdown,
  dropDownOpen,
  handleShowModal,
  dropdownRef,
}) => {
  return (
    <nav className="bg-white shadow w-full fixed top-0 flex justify-between items-center h-[70px] px-2 z-50">
      <button className="focus:outline-none md:hidden" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
      </button>
      <div className="brand hidden md:inline-block">
        <h3>NINU</h3>
        <h6 className="text-body-secondary">university system</h6>
      </div>
      <div className={`middle-part  flex flex-col items-center`}>
        <div className="name font-bold">
          {loading ? (
            <div className="animate-pulse skeleton-line w-40 h-4 mb-2 bg-slate-200 rounded"></div>
          ) : (
            <p className="mb-0">{fullName}</p>
          )}
        </div>
        <div className="mail">
          {loading ? (
            <div className="animate-pulse skeleton-line w-56 h-3 mb-2 bg-slate-200 rounded"></div>
          ) : (
            <p className="mb-0 text-black-50">{email}</p>
          )}
        </div>
      </div>

      <div className="right-part flex gap-2">
        <div className="relative">
          <button
            ref={dropdownRef}
            className="focus:outline-none hidden-arrow flex items-center"
            type="button"
            onClick={handleToggleDropdown}
          >
            {loading ? (
              <div class="animate-pulse rounded-full bg-slate-200 h-10 w-10"></div>
            ) : (
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                className="rounded-full"
                width="40"
                height="40"
                alt="Avatar"
                loading="lazy"
              />
            )}

            <FontAwesomeIcon icon={faCaretDown} className="h-4 w-4 ml-2" />
          </button>
          {dropDownOpen && (
            <ul
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-lg"
            >
              <li>
                <button
                  className="w-full text-left py-2 px-4 block whitespace-no-wrap hover:bg-gray-100"
                  onClick={handleShowModal}
                >
                  Change Password
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="w-full text-left py-2 px-4 block whitespace-no-wrap hover:bg-gray-100"
                >
                  Settings
                </a>
              </li>
              <li>
                <button
                  className="w-full text-left py-2 px-4 block whitespace-no-wrap hover:bg-gray-100"
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
  );
};

export default UserNavbar;
