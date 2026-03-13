"use client";

import React, { useState } from 'react'
import Image from "next/image";

const images = [
    "https://images.pexels.com/photos/16718734/pexels-photo-16718734.jpeg",
    "https://images.pexels.com/photos/9577530/pexels-photo-9577530.jpeg",
    "https://images.pexels.com/photos/10727327/pexels-photo-10727327.jpeg",
];

const Carousel = () => {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
    const next = () => setCurrent(current === images.length - 1 ? 0 : current + 1);

    return (
        <div className="relative w-full h-96 rounded-2xl overflow-hidden">
            {images.map((src, i) => (
                <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
                    <Image src={src} alt={`Slide ${i + 1}`} fill className="object-cover object-center" />
                </div>
            ))}

            {/* Controls */}
            <div className="absolute right-4 -bottom-2 -translate-y-1/2 z-10 w-28 h-14 rounded-full bg-white/30 backdrop-blur-md inline-flex gap-4 items-center justify-center">
                <button onClick={prev} className="z-20 w-10 h-10 rounded-full bg-white/50 hover:bg-white/50 flex items-center justify-center hover:drop-shadow-md transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7"/>
                    </svg>
                </button>
                <button onClick={next} className="z-20 w-10 h-10 rounded-full bg-white/50 hover:bg-white/50 flex items-center justify-center hover:drop-shadow-md transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7"/>
                    </svg>
                </button>
            </div>

        </div>
    )
}
export default Carousel
