"use client";

import useSWR from 'swr';
import axios from "@/lib/axios";

export default function useBanner(category) {
    const endpoint = category
        ? `/api/banner?category=${encodeURIComponent(category)}`
        : '/api/banner';

    const { data, error, isLoading } = useSWR(
        endpoint,
        () => axios.get(endpoint).then(res => res.data.data),
        {
            revalidateOnFocus: false, // don’t refetch when user comes back to tab
            revalidateIfStale: false, // don’t fetch if data is stale
            revalidateOnReconnect: false, // don’t fetch when reconnecting
        }
    );

    return {
        banner: data,
        isLoading,
        error
    };
}