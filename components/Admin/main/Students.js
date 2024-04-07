import Search from "../Search";
import Link from "next/link";
import StudentsTable from "./StudentsTable";

const Students = ({
  deleteUser,
  users = [],
  setFilteredUsers,
  filteredUsers = [],
}) => {
  return (
    <div className="flex flex-wrap">
      <div className="relative flex-grow max-w-full flex-1 px-4">
        <div className="header sm:flex space-y-2 sm:space-y-0 items-center justify-between">
          <h3 className="font-bold">Registered Users</h3>
          <div className="flex gap-2">
            <Search users={users} setFilteredUsers={setFilteredUsers} />
            <Link href="/admin/add-user">
              <button className="min-w-24 inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600">
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
  );
};

export default Students;
