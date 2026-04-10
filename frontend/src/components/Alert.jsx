"use client";

import React, { useEffect, useState } from "react";

const Alert = ({ message, type = "info" }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => setShow(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message) return null;

    return (
        <div
            className={`
                fixed top-20 left-1/2 -translate-x-1/2 z-50
                w-[min(calc(100vw-8rem),22rem)] sm:w-auto sm:max-w-md
                px-4 py-3 rounded-full shadow-lg flex items-start sm:items-center gap-2
                backdrop-blur-md border border-black/10
                transition-all duration-300 ease-out
                ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
                ${type === "success" ? "bg-green-50 text-green-700" : ""}
                ${type === "error" ? "bg-red-50 text-red-700" : ""}
                ${type === "info" ? "bg-white/80 text-black" : ""}
            `}
        >
            {/* Bell Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 transition-transform duration-300"
            >
                <path
                    fill="currentColor"
                    d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586z"
                />
            </svg>

            <p className="flex-1 text-sm leading-5 text-black break-words">{message}</p>

            {/* Close button */}
            <button
                onClick={() => setShow(false)}
                className="ml-1 shrink-0 pt-0.5 text-sm opacity-60 hover:opacity-100 sm:ml-2 sm:pt-0"
            >
                ✕
            </button>

            {/* Progress bar */}
            <div
                key={message}
                className="absolute bottom-0 left-0 h-1 bg-accent"
                style={{
                    animation: "progress 5s linear forwards",
                    width: "100%",
                }}
            />
        </div>
    );
};

export default Alert;