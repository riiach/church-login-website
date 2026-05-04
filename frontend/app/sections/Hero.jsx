"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useBanner from '@/hooks/useBanner'
import { useFirstPage } from '@/context/pageLoad'

const Hero = () => {
    const { banner = [], isLoading } = useBanner('main')
    const [current, setCurrent] = useState(0)
    const { setFirstPageLoaded } = useFirstPage()

    const sortedBanner = [...banner].sort((a, b) => a.order - b.order)

    const prev = () => {
        setCurrent((prev) =>
            prev === 0 ? sortedBanner.length - 1 : prev - 1
        )
    }

    const next = () => {
        setCurrent((prev) =>
            prev === sortedBanner.length - 1 ? 0 : prev + 1
        )
    }

    useEffect(() => {
        if (sortedBanner.length === 0) return

        const interval = setInterval(() => {
            setCurrent((prev) =>
                prev === sortedBanner.length - 1 ? 0 : prev + 1
            )
        }, 7000)

        return () => clearInterval(interval)
    }, [sortedBanner.length])

    if (isLoading || sortedBanner.length === 0) return null

    return (
        <section className="relative w-full h-[84vh] mt-0 xl:mt-26 rounded-2xl overflow-hidden">

            {sortedBanner.map((item, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        i === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {/* Image */}
                    <Image
                        src={item.image_url}
                        alt={`Banner ${i + 1}`}
                        fill
                        className="object-cover"
                        priority={i === 0}
                        onLoadingComplete={() => {
                            setFirstPageLoaded(true);
                        }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Text + Link */}
                    <div className="absolute bottom-0 left-0 w-full inset-0 z-10 flex flex-col items-start justify-end gap-4 py-4 px-8 pb-24 text-center">
                        
                        {item.text_content && (
                            <h1 className="text-white py-2 w-full text-left whitespace-pre-line">
                                {item.text_content}
                            </h1>
                        )}

                        {item.link && (
                            <Link
                                href={item.link}
                                className="flex flex-row group overflow-hidden"
                                scroll={true}
                            >
                                <p className="button-primary mr-2 text-white group-hover:text-accent-text transition-all duration-300">
                                    Find Out More
                                </p>

                                <div className="button-tertiary group-hover:scale-103 stroke-2 fill-none stroke-foreground w-12 h-12 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                                        <path d="M18 6L6 18M8 6h10v10"/>
                                    </svg>
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="absolute right-6 bottom-6 z-20 w-28 h-14 rounded-full bg-white/30 backdrop-blur-md inline-flex gap-4 items-center justify-center">

                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:drop-shadow-md transition-all duration-300"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7"/>
                            </svg>
                        </button>

                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:drop-shadow-md transition-all duration-300"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>

            ))}
        </section>
    )
}

export default Hero