"use client";

import "./form.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoginForm2 from "@/components/LoginForm2";
import Image from "next/image";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const imgStyle = {
    width: "100%",
    height: "auto",
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
        const storageKey = role === "admin" ? "adminData" : "userData";
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
    <div className="login-page h-screen md:flex p-3 gap-3">
      <div
        className="left h-full w-full md:w-1/2 rounded-md bg-gray-100 space-y-6
      p-4"
      >
        <div className="header space-y-3">
          <h1 className="text-2xl font-semibold">NINU System</h1>
          <h3 className="text-3xl ">
            welcome to <span className="text-blue-600">NINU</span>,
            <p>
              please <span className="text-blue-600">Login</span>
            </p>
          </h3>
        </div>
        <div className="w-full">
          <LoginForm2
            setUsername={(e) => {
              setUsername(e.target.value);
            }}
            setPassword={(e) => {
              setPassword(e.target.value);
            }}
            handleSubmit={handleSubmit}
            loading={loading}
            role={role}
            setRole={(e) => {
              setRole(e.target.value);
            }}
          />
        </div>
      </div>
      <div
        className="right h-full w-full md:w-1/2 rounded-md hidden md:flex  flex-col justify-center
      p-4"
      >
        <div className="w-full">
          <Image
            src="/landing.jpg"
            width={500}
            height={500}
            alt="landing"
            className="rounded"
            priority={true}
            style={imgStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
