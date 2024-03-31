import Search from "./Search";

const AdminNavbar = () => {
  const handleLogout = async () => {
    await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("adminData");
        router.push("/");
      }
    });
  };
  return (
    <nav className="relative flex items-center content-between py-3 px-4 text-black bg-gray-100">
      <div className="container mx-auto sm:px-4">
        <h1 className="inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap">
          Admin Panel
        </h1>
      </div>
      <div className="flex align-middle gap-4">
        <button
          className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-red-600 border-red-600 hover:text-white bg-white hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
