"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useSweepInView = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current || !textRef.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 30%",
                once: true,
                markers: false,
                onEnter: () => {
                    textRef.current?.classList.add("active");
                },
            });
        }, sectionRef);

        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(timeout);
            ctx.revert();
        };
    }, []);

    return { sectionRef, textRef };
};