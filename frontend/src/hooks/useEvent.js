"use client";

import useSWR from 'swr';
import axios from "@/lib/axios";

export default function useEvent() {
    const { data, error, isLoading } = useSWR(
        "/api/event",
        () => axios.get('/api/event').then(res => res.data.data),
        {
            revalidateOnFocus: false, // don’t refetch when user comes back to tab
            revalidateIfStale: false, // don’t fetch if data is stale
            revalidateOnReconnect: false, // don’t fetch when reconnecting
        }
    );

    return {
        event: data,
        isLoading,
        error
    };
}