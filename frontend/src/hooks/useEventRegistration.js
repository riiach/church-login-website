"use client";

import useSWR from "swr";
import axios from "@/lib/axios";
import { useState } from "react";
import { usePCUser } from "@/context/profile";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useEventRegistration(eventId) {
    const { user } = usePCUser();
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch remaining slots (cached via SWR)
    const {
        data: remainingData,
        mutate: mutateRemaining,
        isLoading: isLoadingRemaining,
        error: remainingError,
    } = useSWR(
        eventId ? `/api/events/${eventId}/remaining-slots` : null,
        fetcher,
        { revalidateOnFocus: false }
    );

    const remaining = remainingData?.remaining_slots ?? null;
    const isFull = remaining === 0;

    // Fetch registration status for current user
    const {
        data: registrationData,
        mutate: mutateRegistration,
        isLoading: isLoadingRegistration,
        error: registrationError,
    } = useSWR(
        eventId && user?.id ? `/api/events/${eventId}/check-registration/${user.id}` : null,
        fetcher,
        { revalidateOnFocus: false }
    );

    const registeredState = !!registrationData;

    // Register user function
    const registerUser = async () => {
        if (!user?.id || !eventId) {
            setMessage("Please sign in to register for this event.");
            return;
        }
        if (registeredState) return; // already registered
        setLoading(true);
        try {
            await axios.post(`/api/events/${eventId}/register`, {
                user_id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                profile_photo: user.profile_photo,
            });
            setMessage("You have been registered!");
            mutateRemaining(); // refetch remaining slots
            mutateRegistration(true); // mark user as registered locally
        } catch (error) {
            console.error("Error registering event:", error);
            setMessage("Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Unregister user function
    const unregisterUser = async () => {
        if (!user?.id || !eventId) return;
        if (!registeredState) return; // not registered
        setLoading(true);
        try {
            await axios.post(`/api/events/${eventId}/unregister`, {
                user_id: user.id,
            });
            setMessage("You have been unregistered.");
            mutateRemaining(); // refetch remaining slots
            mutateRegistration(null); // mark user as unregistered locally
        } catch (error) {
            console.error("Error unregistering event:", error);
            setMessage("Failed to unregister. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        registerUser,
        unregisterUser,
        remaining,
        registeredState,
        isFull,
        isLoading: isLoading || isLoadingRemaining || isLoadingRegistration,
        remainingError,
        registrationError,
        message,
        mutateRemaining,
        mutateRegistration,
    };
}