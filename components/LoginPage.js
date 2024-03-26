"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import "@/styles/Loading.css";

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
                sessionStorage.setItem(
                    storageKey,
                    JSON.stringify({ username, role })
                );
                router.push(
                    role === "admin"
                        ? "/admin"
                        : `/user/${user._id}`
                );
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Login successful!",
                });
                setUsername("");
                setPassword("");
                setRole("user");
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
        <div className="login-page bg-gray-500 h-full">
            <div className="container mx-auto sm:px-4 max-w-full ">
                <div className="flex flex-wrap  justify-center items-center">
                    <div className=" mt-20 sm:w-4/5 pr-4 pl-4 md:w-2/3  lg:w-1/2 ">
                        <LoginForm
                            setUsername={(e) =>
                                setUsername(e.target.value.trim().toLowerCase())
                            }
                            setPassword={(e) => setPassword(e.target.value)}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            role={role}
                            setRole={(e) => setRole(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
