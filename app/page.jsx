"use client";

import "./form.css";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import ThemeSwither from "@/components/ThemeSwitcher";

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
    <div className="login-page h-screen overflow-hidden">
      <div className="header absolute top-4 right-6">
        <ThemeSwither />
      </div>
      <div className="main  md:flex p-2 sm:p-3 gap-3">
        <div
          className="left h-full w-full md:w-1/2 rounded-md bg-light dark:bg-dark space-y-6 p-2
      sm:p-4 shadow-xl transition-all"
        >
          <div className="header p-2 sm:p-0 space-y-2 transition-all">
            <h1 className="text-2xl font-semibold">NINU System</h1>
            <h3 className="text-xl text-dark dark:text-light">
              welcome to <span className="text-dark-blue">NINU</span>,
              <p>
                please <span className="text-dark-blue">Login</span>
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
          className="right h-screen w-full md:w-1/2 rounded-md hidden md:flex  flex-col justify-center 
      p-4"
        >
          <div className="w-full">
            <Image
              src="/landing.jpg"
              width={500}
              height={500}
              alt="landing"
              className="rounded  shadow-xl"
              priority={true}
              style={imgStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
