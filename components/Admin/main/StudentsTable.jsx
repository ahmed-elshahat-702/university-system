import React from "react";
import Link from "next/link";

const StudentsTable = ({ users, deleteUser }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full max-w-full bg-transparent mt-4 transition-all">
        <thead className="border-b border-gray-500 text-left">
          <tr className=" bg-light dark:bg-dark">
            <th className="px-4 py-2 sm:w-1/5 md:w-1/4 lg:w-1/5">Username</th>
            <th className="px-4 py-2 sm:w-1/5 md:w-1/4 lg:w-1/5">Password</th>
            <th className="px-4 py-2 sm:w-1/5 md:w-1/4 lg:w-1/5">Role</th>
            <th className="px-4 py-2 sm:w-1/5 md:w-1/4 lg:w-1/5">Action</th>
            <th className="px-4 py-2 sm:w-1/5 md:w-1/4 lg:w-1/5">Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="px-4 py-2 sm:w-1/5 md:w-1/4 lg:w-1/5">
                {user.userRegistration.username}
              </td>
              <td className="px-4 py-2 sm:w-1/5 md:w-1/4 lg:w-1/5">
                {user.userRegistration.password}
              </td>
              <td className="px-4 py-2 sm:w-1/5 md:w-1/4 lg:w-1/5">
                {user.userRegistration.role}
              </td>
              <td className="px-4 py-2 sm:w-1/5 md:w-1/4 lg:w-1/5">
                <button
                  className="inline-block text-sm px-3 py-1 leading-normal text-lighter bg-light-red rounded hover:bg-dark-red focus:outline-none focus:ring focus:ring-light-red"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
              <td className="px-4 py-2 sm:w-1/5 md:w-1/4 lg:w-1/5">
                <Link
                  href={`/admin/user-details/${user._id}`}
                  className="text-dark-blue hover:underline focus:outline-none"
                >
                  <span>Details</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
