import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const PasswordInput = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative flex items-stretch w-full">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="block appearance-none w-full h-9 py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 focus:outline-none rounded-s"
                id="password"
                value={value}
                onChange={onChange}
                required
            />
            <button
                type="button"
                className="inline-block h-9 align-middle text-center select-none border border-s-0 font-normal rounded-e px-3 leading-normal no-underline text-gray-600 border-gray-300 hover:text-white bg-white hover:bg-gray-700"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
};

export default PasswordInput;
