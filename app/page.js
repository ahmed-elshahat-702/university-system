"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        setUsername("");
        setPassword("");
        setRole("user");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login successful!",
        });
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
    <div className="login-page bg-slate-200 h-full">
      <div className="flex flex-wrap justify-center items-center">
        <div className="mt-20 w-full flex justify-center">
          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            loading={loading}
            role={role}
            setRole={setRole}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
