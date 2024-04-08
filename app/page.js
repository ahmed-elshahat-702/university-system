"use client";

import "./form.css";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const imgStyle = {
    width: "100%",
    height: "auto",
  };

  return (
    <div className="login-page h-screen md:flex p-2 sm:p-3 gap-3">
      <div
        className="left h-full w-full md:w-1/2 rounded-md bg-gray-100 space-y-6 p-2
      sm:p-4 shadow-md"
      >
        <div className="header p-2 sm:p-0 space-y-2">
          <h1 className="text-2xl font-semibold">NINU System</h1>
          <h3 className="text-xl ">
            welcome to <span className="text-blue-600">NINU</span>,
            <p>
              please <span className="text-blue-600">Login</span>
            </p>
          </h3>
        </div>
        <div className="w-full h-max sm:h-fit">
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            loading={loading}
            setLoading={setLoading}
            role={role}
            setRole={setRole}
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
            className="rounded shadow-lg"
            priority={true}
            style={imgStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
