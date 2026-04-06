"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "../lib/axios";

export const useAuth = ({ middleware } = {}) => {
    const router = useRouter();

    const fetcher = async () => {
        try {
            const res = await axios.get("/api/user", {
                withCredentials: true,
            });
            return res.data.data;
        } catch (error) {
            if (error.response?.status === 401) return null;
            throw error;
        }
    };

    const { data: user, error, mutate } = useSWR(
        "/api/user",
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        }
    );

    const csrf = () =>
        axios.get("/sanctum/csrf-cookie", { withCredentials: true });

    // Login
    const login = async ({ setErrors, ...props }) => {
        setErrors([]);

        await csrf();

        try {
            await axios.post("/api/login", props, {
                withCredentials: true,
            });

            await mutate();
            router.replace("/user/dashboard");
        } catch (error) {
            if (error.response?.status !== 422) throw error;

            setErrors(Object.values(error.response.data.errors).flat());
        }
    };

    // Logout
    const logout = async () => {
        try {
            await csrf();

            // Web-session logout endpoint for Planning Center flow.
            await axios.post("/logout", {}, { withCredentials: true });

            // Immediately clear cached user and avoid stale UI state.
            await mutate(null, false);

            router.replace("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        if (user === undefined) return;

        if (middleware === "guest" && user) {
            router.push("/");
        }

        // ✅ FIX: redirect to real page, not API
        if (middleware === "auth" && user === null) {
            router.push("/login");
        }
    }, [user, middleware, router]);

    return {
        user,
        csrf,
        isLoading: user === undefined,
        login,
        logout,
    };
};