"use client";

import useSWR from 'swr';
import axios from "@/lib/axios";

export default function useAnnouncement() {
    const { data, error, isLoading } = useSWR(
        "/api/announcement",
        () => axios.get('/api/announcement')
            .then((res) => res.data.data)
    );

    return {
        announcement: data,
        isLoading,
        error
    };
}