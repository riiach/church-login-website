"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div
            className="relative w-24 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center cursor-pointer"
            onClick={toggleTheme}
        >
            {/* Sun and Moon icons */}
            <div className="flex justify-between px-2 w-full z-10">
                {/* Sun */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`w-8 h-8 transition-colors duration-300 ${
                        theme === "light" ? "text-yellow-400" : "text-gray-400"
                    }`}
                    fill="currentColor"
                >
                    <path d="M12 16.5A4.505 4.505 0 0 1 7.5 12c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5s-2.019 4.5-4.5 4.5" />
                    <path
                        fillRule="evenodd"
                        d="M12 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 12 3m6 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5M3 12a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 3 12m9 6a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5m6.354-12.354a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0m-10.5 10.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0m-2.208-10.5a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 1 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708m10.5 10.5a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708"
                        clipRule="evenodd"
                    />
                </svg>

                {/* Moon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-8 h-8 transition-colors duration-300 ${
                        theme === "dark" ? "text-blue-900" : "text-gray-400"
                    }`}
                >
                    <path d="M20.993 13.313a6 6 0 0 1-7.306-7.306a7 7 0 1 0 7.306 7.306" />
                    <path
                        fillRule="evenodd"
                        d="M4.5 8.25a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-1 0v-1.5a.5.5 0 0 1 .5-.5"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        d="M3.25 9.5a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1h-1.5a.5.5 0 0 1-.5-.5M7.5 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        d="M6 4.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {/* Sliding circle button */}
            <div
                className={`absolute top-1 left-1 w-10 h-10 rounded-full bg-white/50 flex items-center justify-center shadow-md transition-all duration-300
        ${theme === "dark" ? "translate-x-12" : "translate-x-0"}`}
            ></div>
        </div>
    );
}