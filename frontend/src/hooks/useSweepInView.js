"use client";

import { useCallback, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useSweepInView = () => {
    const [sectionElement, setSectionElement] = useState(null);
    const [textElement, setTextElement] = useState(null);

    const sectionRef = useCallback((node) => {
        setSectionElement(node);
    }, []);

    const textRef = useCallback((node) => {
        setTextElement(node);
    }, []);

    useEffect(() => {
        if (!sectionElement || !textElement) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionElement,
                start: "top 30%",
                once: true,
                markers: false,
                onEnter: () => {
                    textElement.classList.add("active");
                },
            });
        }, sectionElement);

        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(timeout);
            ctx.revert();
        };
    }, [sectionElement, textElement]);

    return { sectionRef, textRef };
};