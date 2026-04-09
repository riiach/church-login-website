"use client"

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { getPastLiveVideos } from "@/lib/youtube"

const formatDate = (value) => {
    if (!value) {
        return "Recent sermon";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Recent sermon";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
};

const VideoCard = ({ currentPage = 0, videosPerPage = 8, pageDirection = 0, onPageCountChange }) => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadVideo = async () => {
            try {
                const nextVideos = await getPastLiveVideos();

                if (isMounted) {
                    setVideos(nextVideos ?? []);
                }
            } catch (error) {
                if (isMounted) {
                    setVideos([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadVideo();

        return () => {
            isMounted = false;
        };
    }, []);

    const totalPages = useMemo(() => {
        if (videos.length === 0) {
            return 0;
        }

        return Math.ceil(videos.length / videosPerPage);
    }, [videos, videosPerPage]);

    useEffect(() => {
        if (typeof onPageCountChange === "function") {
            onPageCountChange(totalPages);
        }
    }, [onPageCountChange, totalPages]);

    const safePage = totalPages === 0
        ? 0
        : Math.min(currentPage, totalPages - 1);

    const visibleVideos = useMemo(() => {
        const startIndex = safePage * videosPerPage;

        return videos.slice(startIndex, startIndex + videosPerPage);
    }, [safePage, videos, videosPerPage]);

    if (isLoading) {
        return (
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: videosPerPage }).map((_, index) => (
                    <div key={index} className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-foreground/10" />
                ))}
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className="flex aspect-video w-full items-end rounded-[2rem] border border-foreground/10 bg-background p-6">
                <div className="max-w-md">
                    <p className="text-section-title mb-3">PAST SERMONS</p>
                    <h3 className="font-manrope text-2xl font-semibold text-foreground">No sermon videos are available right now.</h3>
                </div>
            </div>
        );
    }

    return (
        <div
            key={`${safePage}-${pageDirection}`}
            className={`grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 ${pageDirection < 0 ? "page-slide-left" : pageDirection > 0 ? "page-slide-right" : ""}`}
        >
            {visibleVideos.map((video) => (
                <a
                    key={video.videoId}
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group block w-full overflow-hidden rounded-2xl"
                >
                    <article className="relative aspect-video w-full overflow-hidden rounded-sm bg-black">
                        <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
                            <h3 className="font-manrope text-xl font-semibold leading-tight text-white py-2">
                                {video.title}
                            </h3>
                            <p className="text-sm text-white/80">{formatDate(video.publishedAt)}</p>
                        </div>
                    </article>
                </a>
            ))}
        </div>
    )
}

export default VideoCard
