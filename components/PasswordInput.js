import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, id }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-stretch w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        className="block w-full h-9 py-1 px-2 mb-1 bg-white text-gray-800 border border-gray-200 focus:outline-blue-600 rounded-s"
        id={id}
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="h-9 select-none border border-s-0 rounded-e px-3 text-blue-600 border-gray-300 hover:text-white bg-white hover:bg-blue-700"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
