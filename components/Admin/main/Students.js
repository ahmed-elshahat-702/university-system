import Search from "../Search";
import Link from "next/link";
import StudentsTable from "./StudentsTable"; // Renamed from UsersTable

const Students = ({
  deleteUser,
  users = [],
  setFilteredUsers,
  filteredUsers = [],
}) => {
  return (
    <div className="admin-page h-full">
      <div className="container mx-auto sm:px-4 max-w-full p-6">
        <div className="flex flex-wrap">
          <div className="relative flex-grow max-w-full flex-1 px-4">
            <div className="header flex items-center justify-between mb-5">
              <h3 className="font-bold">Registered Users</h3>
              <div className="flex gap-2">
                <Search users={users} setFilteredUsers={setFilteredUsers} />
                <Link href="/admin/add-user">
                  <button className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600">
                    Add User
                  </button>
                </Link>
              </div>
            </div>
            {filteredUsers.length > 0 ? (
              <StudentsTable users={filteredUsers} deleteUser={deleteUser} />
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
