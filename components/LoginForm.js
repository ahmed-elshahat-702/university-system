import React, { useCallback } from "react";
import PasswordInput from "./PasswordInput";
import LoadingSpinner from "./LoadingSpinner";

const LoginForm = ({
  handleSubmit,
  setUsername,
  password,
  setPassword,
  role,
  setRole,
  loading,
}) => {
  const handleUsernameChange = useCallback(
    (e) => {
      setUsername(e.target.value);
    },
    [setUsername]
  );

  const handlePasswordChange = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const handleRoleChange = useCallback(
    (e) => {
      setRole(e.target.value);
    },
    [setRole]
  );
  return (
    // <div className="p-6 w-full sm:w-[600px] h-full">
    <>
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username">
            <strong>Username</strong>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className="block w-full focus:outline-blue-600 h-9 py-1 px-2 mb-1 bg-white text-gray-800 border border-gray-200 rounded"
            id="username"
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <PasswordInput value={password} onChange={handlePasswordChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="role">
            <strong>Role</strong>
          </label>
          <select
            className="block w-full focus:outline-blue-600 h-9 py-1 px-2 mb-1 bg-white text-gray-800 border border-gray-200 rounded"
            id="role"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="inline-block select-none rounded py-1 px-3 bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </form>
      {/* </div> */}
    </>
  );
};

export default LoginForm;
