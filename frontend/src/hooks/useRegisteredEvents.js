"use client";

import useSWR from 'swr';
import axios from "@/lib/axios";

export default function useRegisteredEvents(userId) {
    const endpoint = userId ? `/api/users/${userId}/registered-events` : null;

    const { data, error, isLoading } = useSWR(
        endpoint,
        () => axios.get(endpoint).then((res) => res.data.data),
        {
            revalidateOnFocus: false,
            revalidateIfStale: true,
            revalidateOnReconnect: false,
            revalidateOnMount: true,
        }
    );

    return {
        events: data ?? [],
        isLoading,
        error,
    };
}