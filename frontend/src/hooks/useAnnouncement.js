"use client";

import useSWR from 'swr';
import axios from "@/lib/axios";

export default function useAnnouncement() {
    const { data, error, isLoading } = useSWR(
        "/api/announcement",
        () => axios.get('/api/announcement').then(res => res.data.data),
        {
            revalidateOnFocus: false,   // Don't fetch again when tab/window is focused
            revalidateOnReconnect: false, // Don't fetch on network reconnect
            refreshInterval: 0,         // Disable polling
        }
    );

    return {
        announcement: data,
        isLoading,
        error
    };
}