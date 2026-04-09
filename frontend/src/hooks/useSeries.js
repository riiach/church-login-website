"use client";

import useSWR from 'swr';
import axios from "@/lib/axios";

export default function useSeries() {
    const { data, error, isLoading } = useSWR(
        "/api/series",
        () => axios.get('/api/series').then(res => res.data.data),
        {
            revalidateOnFocus: true,
            revalidateIfStale: true,
            revalidateOnReconnect: true,
        }
    );

    return {
        series: data,
        isLoading,
        error
    };
}