import SearchInput from "./SearchInput";

const AdminNavbar = ({ onSearch, handleLogout, searchTerm, setSearchTerm }) => {
    return (
        <nav className="relative flex items-center content-between py-3 px-4 text-black bg-gray-100">
            <div className="container mx-auto sm:px-4">
                <h1 className="inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap">
                    Admin Panel
                </h1>
            </div>
            {/* <SearchInput
                onSearch={onSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            /> */}
            <button
                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-red-600 border-red-600 hover:text-white bg-white hover:bg-red-700"
                onClick={handleLogout}
            >
                Logout
            </button>
        </nav>
    );
};

export default AdminNavbar;
