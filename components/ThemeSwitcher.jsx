"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { CiDark, CiLight } from "react-icons/ci";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <button
      className={`w-fit p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-lighter dark:text-darker bg-darker dark:bg-lighter`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <CiDark className="text-3xl" />
      ) : (
        <CiLight className="text-3xl" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
