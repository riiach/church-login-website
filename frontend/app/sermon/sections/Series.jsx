"use client"

import React, { useMemo, useState } from 'react'
import { useSweepInView } from '@/hooks/useSweepInView.js'
import useBanner from "@/hooks/useBanner";
import Image from "next/image";
import Milestone from "@/components/Milestone";
import useSeries from "@/hooks/useSeries"

const normalizeImageSrc = value => {
    if (typeof value !== "string") {
        return null;
    }

    const trimmedValue = value.trim();

    if (trimmedValue === "") {
        return null;
    }

    try {
        return new URL(trimmedValue).toString();
    } catch {
        return encodeURI(trimmedValue);
    }
};

const parseDateOnly = value => {
    if (typeof value !== "string" || value.trim() === "") {
        return null;
    }

    const [year, month, day] = value.split("-").map(Number);

    if (!year || !month || !day) {
        return null;
    }

    return new Date(year, month - 1, day);
};

const getToday = () => {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const Series = () => {
    {/* useSweepInView */}
    const { sectionRef, textRef } = useSweepInView();
    const [useNativeImage, setUseNativeImage] = useState(false);

    const { banner = [], isLoading: isBannerLoading } = useBanner("series");
    const { series = [], isLoading: isSeriesLoading } = useSeries();

    if (isBannerLoading || isSeriesLoading) return <p>Loading...</p>;

    const seriesBanner = banner[0] ?? null;

    const imageSrc = normalizeImageSrc(seriesBanner?.image_url);

    const activeSeries = useMemo(() => {
        const today = getToday();

        return [...series]
            .sort((left, right) => (left.order ?? 0) - (right.order ?? 0))
            .find(item => {
                const startDate = parseDateOnly(item.start_date);
                const endDate = parseDateOnly(item.end_date);

                if (endDate && endDate < today) {
                    return false;
                }

                if (startDate && startDate > today) {
                    return false;
                }

                return Boolean(startDate || endDate);
            }) ?? null;
    }, [series]);

    return (
        <section id="series" className="flex w-full flex-col py-4 xl:h-screen xl:py-8" ref={sectionRef}>
            <div className="mt-4 flex w-full flex-col gap-4 xl:mt-20 xl:min-h-0 xl:h-full">
                <div className="relative h-[36rem] w-full overflow-hidden rounded-2xl bg-black sm:h-[38rem] xl:h-full">
                    {imageSrc && !useNativeImage && (
                        <Image
                            src={imageSrc}
                            alt="Sermon Series Banner"
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority
                            unoptimized
                            onError={() => setUseNativeImage(true)}
                        />
                    )}
                    {imageSrc && useNativeImage && (
                        <img
                            src={imageSrc}
                            alt="Sermon Series Banner"
                            className="h-full w-full object-cover"
                            loading="eager"
                        />
                    )}
                    <div className="w-full h-full absolute z-25 flex flex-col justify-end px-4 md:px-12 md:pb-8 items-start">
                        <p className="text-4xl md:text-7xl font-manrope text-white ml-2">
                            {activeSeries?.title ?? "Current Series"}
                        </p>
                        {typeof activeSeries?.description === "string" && activeSeries.description.trim() !== "" && (
                            <p className="text-sm md:text-base text-white ml-4 mt-4">{activeSeries.description}</p>
                        )}
                        <Milestone colorScheme="light" align="start" />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Series