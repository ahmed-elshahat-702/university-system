import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import React, { useState } from "react";

import LoadingSpinner from "./LoadingSpinner";
import { GoMention } from "react-icons/go";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  role,
  setRole,
  loading,
  setLoading,
}) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
  const passwordRegex = /^.{8,}$/;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    setUsernameError(
      value.match(usernameRegex)
        ? ""
        : "Username must be 3 to 15 characters long and contain only letters, numbers."
    );
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(
      value.match(passwordRegex)
        ? ""
        : "Password must be at least 8 characters long."
    );
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const validateForm = () => {
    setUsernameError(
      username.match(usernameRegex)
        ? ""
        : "Username must be 3 to 15 characters long and contain only letters, numbers."
    );
    setPasswordError(
      password.match(passwordRegex)
        ? ""
        : "Password must be at least 8 characters long."
    );
    return username.match(usernameRegex) && password.match(passwordRegex);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`/api/login`, {
        username,
        password,
        role,
      });

      const { data } = response;

      if (data.message === "Login successful") {
        const { user } = data;

        const storageKey = role === "admin" ? "AdminData" : "UserData";
        sessionStorage.setItem(storageKey, JSON.stringify({ username, role }));

        router.push(role === "admin" ? "/admin" : `/user/${user._id}`);
        setRole("user");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login successful!",
        });
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      let errorMessage = "Something went wrong!";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-2.5 bg-white h-full w-full py-5 px-4 sm:p-[30px] rounded-md sm:shadow-md"
      >
        <label htmlFor="username" className="text-gray-950 w-fit">
          Username
        </label>
        <div
          className={`inputForm shadow  ${
            usernameError
              ? "border-red-600 focus-within:border-red-600"
              : "border-gray-300 focus-within:border-blue-600"
          }`}
        >
          <GoMention
            className={`text-3xl pr-2 border-r ${
              usernameError ? "border-red-600" : "border-gray-300"
            }`}
          />
          <input
            type="text"
            id="username"
            className={`input`}
            placeholder="Enter your Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        {usernameError && <p className="text-red-500">{usernameError}</p>}
        <label htmlFor="password" className="text-gray-950 w-fit">
          Password
        </label>
        <div
          className={`inputForm shadow ${
            passwordError
              ? "border-red-600 focus-within:border-red-600"
              : "border-gray-300 focus-within:border-blue-600"
          }`}
        >
          <IoLockClosedOutline
            className={`text-3xl pr-2 border-r  ${
              passwordError ? "border-red-600" : "border-gray-300"
            }`}
          />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={`input ${passwordError && "border-red-600"}`}
            placeholder="Enter your Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <FaRegEyeSlash
                className={`text-4xl px-2 border-l ${
                  passwordError ? "border-red-600" : "border-gray-300"
                }`}
              />
            ) : (
              <FaRegEye
                className={`text-4xl px-2 border-l ${
                  passwordError ? "border-red-600" : "border-gray-300"
                }`}
              />
            )}
          </button>
        </div>
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <label htmlFor="role" className="text-gray-950 w-fit">
          Role
        </label>
        <div className="inputForm shadow">
          <MdOutlineAdminPanelSettings className="text-3xl pr-2 border-r border-gray-300" />
          <select
            className="role"
            id="role"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="button-submit">Sign In</button>
      </form>
    </>
  );
};

export default LoginForm;
