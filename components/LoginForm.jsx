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
    const value = event.target.value.toLowerCase();
    setUsername(value);
    console.log(username);
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

  // submit on inter
  (event) => {
    if (event.key === "Enter") {
      handleSubmitForm(event);
    }
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
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-2.5 bg-lighter dark:bg-darker h-full w-full py-5 px-4 sm:p-[30px] rounded-md sm:shadow-md transition-all"
      >
        <label
          htmlFor="username"
          className={`w-fit  ${usernameError ? "text-light-red" : ""}`}
        >
          Username
        </label>
        <div
          className={`inputForm shadow  ${
            usernameError
              ? "border-light-red focus-within:border-light-red"
              : "border-dark focus-within:border-dark-blue"
          }`}
        >
          <GoMention
            className={`text-3xl pr-2 border-r ${
              usernameError
                ? "text-light-red border-light-red"
                : "text-dark border-dark"
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
        {usernameError && <p className="text-light-red">{usernameError}</p>}
        <label
          htmlFor="password"
          className={`w-fit  ${passwordError ? "text-light-red" : ""}`}
        >
          Password
        </label>
        <div
          className={`inputForm shadow ${
            passwordError
              ? "border-light-red focus-within:border-light-red"
              : "text-dark border-dark focus-within:border-dark-blue"
          }`}
        >
          <IoLockClosedOutline
            className={`text-3xl pr-2 border-r  ${
              passwordError
                ? "text-light-red border-light-red"
                : "text-dark border-dark"
            }`}
          />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={`input ${
              passwordError && "text-light-red border-light-red"
            }`}
            placeholder="Enter your Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <FaRegEyeSlash
                className={`text-4xl px-2 border-l ${
                  passwordError
                    ? "text-light-red border-light-red"
                    : "text-dark border-dark"
                }`}
              />
            ) : (
              <FaRegEye
                className={`text-4xl px-2 border-l ${
                  passwordError
                    ? "text-light-red border-light-red"
                    : "text-dark border-dark"
                }`}
              />
            )}
          </button>
        </div>
        {passwordError && <p className="text-light-red">{passwordError}</p>}
        <label htmlFor="role" className="w-fit">
          Role
        </label>
        <div className="inputForm shadow">
          <MdOutlineAdminPanelSettings className="text-3xl pr-2 border-r text-dark border-dark" />
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
        <button className="button-submit relative uppercase">
          Sign In
          {loading && <LoadingSpinner />}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
