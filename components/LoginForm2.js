import { useCallback, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { GoMention } from "react-icons/go";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const LoginForm2 = ({
  handleSubmit,
  setUsername,
  password,
  setPassword,
  role,
  setRole,
  loading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.5 bg-white w-full p-[30px] rounded-md"
      >
        <label htmlFor="username" className="text-gray-950">
          Username
        </label>
        <div className="inputForm">
          <GoMention className="text-3xl pr-2 border-r border-gray-300" />
          <input
            type="text"
            id="username"
            className="input"
            placeholder="Enter your Username"
            onChange={setUsername}
            required
          />
        </div>
        <label htmlFor="password" className="text-gray-950">
          Password
        </label>
        <div className="inputForm">
          <IoLockClosedOutline className="text-3xl pr-2 border-r border-gray-300" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="input"
            placeholder="Enter your Password"
            value={password}
            onChange={setPassword}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <FaRegEyeSlash className="text-4xl px-2 border-l border-gray-300" />
            ) : (
              <FaRegEye className="text-4xl px-2 border-l border-gray-300" />
            )}
          </button>
        </div>
        <label htmlFor="password" className="text-gray-950">
          Role
        </label>
        <div className="inputForm">
          <MdOutlineAdminPanelSettings className="text-3xl pr-2 border-r border-gray-300" />
          <select className="role" id="role" value={role} onChange={setRole}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="button-submit">Sign In</button>
      </form>
    </>
  );
};

export default LoginForm2;
