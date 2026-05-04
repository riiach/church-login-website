// This context is used to store the authenticated user's profile information and loading state.
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "../lib/axios";

// Create the context
const PCUserContext = createContext(null);

// Create a provider
export const PCUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async () => {
        try {
            await axios.get("/sanctum/csrf-cookie");

            const response = await axios.get("/api/user", {
                withCredentials: true, // needed for Sanctum
            });

            const userData = response.data.data;
            setUser(userData); // {name, email, phone, profile_photo}

            // Redirect only if user exists
            if (userData) {
                router.push("/"); // redirect to frontend home
                console.log("USER:", userData);
            }
        } catch (error) {
            console.error("Error fetching PC user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <PCUserContext.Provider value={{ user, loading }}>
            {children}
        </PCUserContext.Provider>
    );
};

// Use the context
export const usePCUser = () => useContext(PCUserContext);