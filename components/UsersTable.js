import React from "react";
import Link from "next/link";

const UsersTable = ({ users, deleteUser }) => {
    return (
        <table className="w-full max-w-full mb-4 bg-transparent mt-4">
            <thead className="h-9 border-b border-gray-500 text-left">
                <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Action</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._id} className="h-11 border-b border-gray-200">
                        <td>{user.userRegistration.username}</td>
                        <td>{user.userRegistration.password}</td>
                        <td>{user.userRegistration.role}</td>
                        <td>
                            <button
                                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-red-700 text-white hover:bg-red-800 py-2 px-3 leading-tight text-xs "
                                onClick={() => deleteUser(user._id)}
                            >
                                Delete
                            </button>
                        </td>
                        <td>
                            <Link
                                href={`/admin/user-details/${user._id}`}
                                className="underline"
                            >
                                Details
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;
