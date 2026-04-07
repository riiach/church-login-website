"use client";

import React, { useEffect, useState } from "react";

export default function SectionNavigator({ sections = [] }) {
    const [activeId, setActiveId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Prevent scrollbars caused by fixed-positioned children overflowing
        document.body.style.overflowX = "hidden";
        return () => { document.body.style.overflowX = ""; };
    }, []);

    useEffect(() => {
        let mutationObserver = null;
        let trackedSections = [];
        let animationFrameId = null;

        const updateActiveSection = () => {
            if (!trackedSections.length) {
                return;
            }

            const viewportAnchor = window.innerHeight * (window.innerWidth < 768 ? 0.35 : 0.45);
            let nextActiveId = trackedSections[0].id;
            let smallestDistance = Number.POSITIVE_INFINITY;

            trackedSections.forEach(({ id, element }) => {
                const rect = element.getBoundingClientRect();
                const containsAnchor = rect.top <= viewportAnchor && rect.bottom >= viewportAnchor;
                const distanceToSection = containsAnchor
                    ? 0
                    : Math.min(
                        Math.abs(rect.top - viewportAnchor),
                        Math.abs(rect.bottom - viewportAnchor)
                    );

                if (distanceToSection < smallestDistance) {
                    smallestDistance = distanceToSection;
                    nextActiveId = id;
                }
            });

            setActiveId((currentActiveId) => currentActiveId === nextActiveId ? currentActiveId : nextActiveId);
        };

        const scheduleActiveSectionUpdate = () => {
            if (animationFrameId !== null) {
                return;
            }

            animationFrameId = window.requestAnimationFrame(() => {
                animationFrameId = null;
                updateActiveSection();
            });
        };

        const connectObservers = () => {
            trackedSections = sections
                .map((section) => ({
                    id: section.id,
                    element: document.getElementById(section.id),
                }))
                .filter((section) => section.element);

            if (!trackedSections.length) {
                return false;
            }

            scheduleActiveSectionUpdate();

            return true;
        };

        if (!connectObservers()) {
            mutationObserver = new MutationObserver(() => {
                if (connectObservers() && mutationObserver) {
                    mutationObserver.disconnect();
                    mutationObserver = null;
                }
            });

            if (document.body) {
                mutationObserver.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            }
        }

        window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
        window.addEventListener("resize", scheduleActiveSectionUpdate);

        return () => {
            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }

            window.removeEventListener("scroll", scheduleActiveSectionUpdate);
            window.removeEventListener("resize", scheduleActiveSectionUpdate);
            mutationObserver?.disconnect();
        };
    }, [sections]);

    useEffect(() => {
        let footerObserver = null;
        let mutationObserver = null;

        const connectFooterObserver = () => {
            const footer = document.getElementById("footer");

            if (!footer) {
                return false;
            }

            footerObserver?.disconnect();

            footerObserver = new IntersectionObserver(
                ([entry]) => {
                    setIsVisible(!entry.isIntersecting);
                },
                { threshold: 0.1 }
            );

            footerObserver.observe(footer);
            return true;
        };

        if (!connectFooterObserver()) {
            mutationObserver = new MutationObserver(() => {
                if (connectFooterObserver() && mutationObserver) {
                    mutationObserver.disconnect();
                    mutationObserver = null;
                }
            });

            if (document.body) {
                mutationObserver.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            }
        }

        return () => {
            footerObserver?.disconnect();
            mutationObserver?.disconnect();
        };
    }, []);

    return (
        <div
            className={`fixed bottom-8 left-8 z-45 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="flex flex-row items-end gap-1">

                {/* LEFT COLUMN: circles + lines + big trigger — always visible, always centered */}
                <div className="flex flex-col items-center">
                    <div
                        className={`flex flex-col items-center transition-opacity duration-300
                            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                        `}
                    >
                        {sections.map((section) => {
                            const isActive = activeId === section.id;
                            const isHovered = hoveredId === section.id;
                            return (
                                <div key={section.id} className="flex flex-col items-center">
                                    <div
                                        className="w-2 h-2 rounded-full flex-shrink-0 cursor-pointer"
                                        style={{
                                            backgroundColor: isActive || isHovered ? "#a2e861" : "#9CA3AF",
                                            transition: "transform 0.2s ease, background-color 0.2s ease",
                                        }}
                                        onClick={() =>
                                            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                                        }
                                        onMouseEnter={() => setHoveredId(section.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                    />
                                    <div className="w-[4px] h-10 bg-accent" />
                                </div>
                            );
                        })}
                    </div>

                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white cursor-pointer">
                        <svg className="fill-background w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M13,9.41a10.46,10.46,0,0,1-2.53-.65A15.4,15.4,0,0,1,8.83,8a15.3,15.3,0,0,1,1.65-.76A9.61,9.61,0,0,1,13,6.6,1.45,1.45,0,0,0,14,6a1.43,1.43,0,0,0-2.34-1.66h0A9,9,0,0,1,9.85,6.24a15.24,15.24,0,0,1-1.48,1,15.65,15.65,0,0,1,.17-1.8A10.5,10.5,0,0,1,9.25,3a1.41,1.41,0,0,0,0-1.17,1.41,1.41,0,0,0-1.82-.69A1.41,1.41,0,0,0,6.78,3a9.55,9.55,0,0,1,.71,2.52,15.53,15.53,0,0,1,.11,1.8,15.24,15.24,0,0,1-1.48-1A9.82,9.82,0,0,1,4.29,4.37a1.45,1.45,0,0,0-1-.57A1.41,1.41,0,0,0,3,6.6a9.64,9.64,0,0,1,2.52.65A14.61,14.61,0,0,1,7.18,8a15.4,15.4,0,0,1-1.65.75A10.5,10.5,0,0,1,3,9.41,1.39,1.39,0,0,0,2,10a1.41,1.41,0,0,0,2.21,1.74l.06-.09A10.39,10.39,0,0,1,6.12,9.77a15.11,15.11,0,0,1,1.47-1,13.54,13.54,0,0,1-.17,1.8A10,10,0,0,1,6.78,13a1.41,1.41,0,0,0,2.58,1.12,1.45,1.45,0,0,0,0-1.12,9.27,9.27,0,0,1-.7-2.52,13.43,13.43,0,0,1-.24-1.8,15.11,15.11,0,0,1,1.47,1,10.39,10.39,0,0,1,1.83,1.86,1.48,1.48,0,0,0,1,.58,1.41,1.41,0,0,0,.3-2.8Z"/>
                            </g>
                        </svg>
                    </div>
                </div>

                {/* RIGHT COLUMN: labels — zero width when hidden so they never overflow */}
                <div
                    className="flex flex-col pb-12 transition-opacity duration-300"
                    style={{
                        opacity: isOpen ? 1 : 0,
                        pointerEvents: isOpen ? "auto" : "none",
                        width: isOpen ? "auto" : 0,
                        overflow: "hidden",
                    }}
                >
                    {sections.map((section) => {
                        const isActive = activeId === section.id;

                        return (
                            <div
                                key={section.id}
                                className="h-12 flex items-start cursor-pointer"
                                onClick={() =>
                                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                                }
                            >
                            <span className={`text-sm whitespace-nowrap ${
                                isActive ? "text-accent-text" : "text-gray-400"
                            }`}>
                                {section.label}
                            </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}