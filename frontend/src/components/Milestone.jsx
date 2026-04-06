"use client"

import React, { useCallback, useEffect, useState } from "react";
import useSeries from "@/hooks/useSeries"

const LINE_DURATION_MS = 900;
const CIRCLE_START_DELAY_MS = 140;
const CIRCLE_STAGGER_MS = 140;
const TEXT_START_DELAY_MS = 180;
const TEXT_STAGGER_MS = 110;

const statusConfig = {
    done: {
        label: "Done",
        outerRing: { border: "2.5px solid #b4b2a9", background: "transparent" },
        innerDot: { background: "#b4b2a9" },
    },
    active: {
        label: "In progress",
        outerRing: {
            border: "2.5px solid #a2e861",
            background: "transparent",
        },
        innerDot: { background: "#a2e861" },
    },
    upcoming: {
        label: "Upcoming",
        outerRing: { border: "2.5px solid #b4b2a9", background: "transparent" },
        innerDot: { background: "#b4b2a9" },
    },
};

function MilestoneItem({ date, status, title, desc, animate, circleDelay, textDelay }) {
    const config = statusConfig[status];

    return (
        <div style={styles.item}>
            {/* ::before equivalent — outer ring */}
            <div
                style={{
                    ...styles.outerRing,
                    ...config.outerRing,
                    ...(animate ? styles.outerRingVisible : styles.outerRingHidden),
                    transitionDelay: `${circleDelay}ms`,
                }}
            >
                {/* ::after equivalent — inner dot */}
                <div
                    style={{
                        ...styles.innerDot,
                        ...config.innerDot,
                        ...(animate ? styles.innerDotVisible : styles.innerDotHidden),
                        transitionDelay: `${circleDelay + 90}ms`,
                    }}
                />
            </div>

            <div
                style={{
                    ...styles.content,
                    ...(animate ? styles.contentVisible : styles.contentHidden),
                    transitionDelay: `${textDelay}ms`,
                }}
            >
                <p style={styles.date} className="text-foreground/70">{date}</p>
                <p style={styles.title} className="text-foreground">{title}</p>
                <p style={styles.desc} className="text-foreground">{desc}</p>
            </div>
        </div>
    );
}

export default function MilestoneDiagram() {
    const { series = [], isLoading } = useSeries();
    const [containerElement, setContainerElement] = useState(null);
    const [isAnimated, setIsAnimated] = useState(false);

    const containerRef = useCallback((node) => {
        setContainerElement(node);
    }, []);

    const today = new Date();

    const milestones = [...series]
        .sort((left, right) => (left.order ?? 0) - (right.order ?? 0))
        .map((item) => {
            const startDate = item.start_date ? new Date(item.start_date) : null;
            const endDate = item.end_date ? new Date(item.end_date) : null;

            let status = "upcoming";

            if (endDate && endDate < today) {
                status = "done";
            } else if (startDate && startDate <= today && (!endDate || endDate >= today)) {
                status = "active";
            }

            let date = "No date set";

            if (item.start_date && item.end_date) {
                date = `${item.start_date} - ${item.end_date}`;
            } else if (item.start_date) {
                date = item.start_date;
            } else if (item.end_date) {
                date = item.end_date;
            }

            return {
                date,
                status,
                title: item.title,
                desc: item.description,
            };
        });

    useEffect(() => {
        if (!containerElement) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAnimated(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.35,
            }
        );

        observer.observe(containerElement);

        return () => observer.disconnect();
    }, [containerElement]);

    if (isLoading) {
        return <p>Loading series...</p>
    }

    const lastCircleDelay = milestones.length > 0
        ? LINE_DURATION_MS + CIRCLE_START_DELAY_MS + ((milestones.length - 1) * CIRCLE_STAGGER_MS)
        : LINE_DURATION_MS;

    const textStartDelay = lastCircleDelay + TEXT_START_DELAY_MS;

    return (
        <div ref={containerRef} style={styles.card} className="py-8">
            <div
                style={styles.timeline}
                className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                {/* Track with the horizontal line (::before equivalent) */}
                <div style={styles.track} className="overflow-hidden">
                    <div style={styles.trackBaseLine} />
                    <div
                        style={{
                            ...styles.trackSweepLine,
                            ...(isAnimated ? styles.trackSweepLineVisible : styles.trackSweepLineHidden),
                        }}
                        className="overflow-hidden"
                    />
                    {milestones.map((m, i) => (
                        <MilestoneItem
                            key={i}
                            {...m}
                            animate={isAnimated}
                            circleDelay={LINE_DURATION_MS + CIRCLE_START_DELAY_MS + (i * CIRCLE_STAGGER_MS)}
                            textDelay={textStartDelay + (i * TEXT_STAGGER_MS)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
    card: {
        width: "100%",
        maxWidth: "860px",
        margin: "0 auto",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
    },
    timeline: {
        width: "100%",
        maxWidth: "100%",
        display: "block",
        overflowX: "auto",
        overflowY: "hidden",
        paddingBottom: "0.5rem",
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-x",
        overscrollBehaviorX: "contain",
    },
    track: {
        position: "relative",
        display: "inline-flex",
        alignItems: "flex-start",
        width: "max-content",
        minWidth: "100%",
        overflow: "hidden",
    },
    trackBaseLine: {
        position: "absolute",
        top: "7px",
        left: "8px",
        right: "8px",
        height: "2px",
        background: "rgba(162, 232, 97, 0.24)",
        zIndex: 0,
    },
    trackSweepLine: {
        position: "absolute",
        top: "7px",
        left: "8px",
        right: "8px",
        height: "2px",
        background: "#a2e861",
        transformOrigin: "left center",
        transition: `transform ${LINE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: "transform",
        zIndex: 0,
    },
    trackSweepLineHidden: {
        transform: "scaleX(0)",
    },
    trackSweepLineVisible: {
        transform: "scaleX(1)",
        zIndex: 0,
    },
    item: {
        position: "relative",
        flex: "0 0 180px",
        minWidth: "180px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 1,
        overflow: "hidden",
    },
    // Replaces .milestone-item::before (outer dot ring)
    outerRing: {
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease, border-color 240ms ease, background 240ms ease",
        boxSizing: "border-box",
        willChange: "transform, opacity",
        overflow: "hidden",
    },
    outerRingHidden: {
        opacity: 0,
        transform: "scale(0.35)",
    },
    outerRingVisible: {
        opacity: 1,
        transform: "scale(1)",
    },
    // Replaces .milestone-item::after (inner filled dot)
    innerDot: {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease, background 0.2s",
        flexShrink: 0,
        willChange: "transform, opacity",
        overflow: "hidden",
    },
    innerDotHidden: {
        opacity: 0,
        transform: "scale(0)",
    },
    innerDotVisible: {
        opacity: 1,
        transform: "scale(1)",
    },
    content: {
        marginTop: "14px",
        textAlign: "center",
        padding: "0 4px",
        transition: "opacity 520ms ease, transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "opacity, transform",
        overflow: "hidden",
    },
    contentHidden: {
        opacity: 0,
        transform: "translateY(18px)",
    },
    contentVisible: {
        opacity: 1,
        transform: "translateY(0)",
    },
    date: {
        fontFamily: "'DM Mono', 'Courier New', monospace",
        fontSize: "10px",
        letterSpacing: "0.04em",
        marginBottom: "4px",
        overflow: "hidden",
    },
    badge: {
        display: "inline-block",
        fontSize: "10px",
        fontWeight: 500,
        padding: "2px 7px",
        borderRadius: "20px",
        marginBottom: "6px",
    },
    title: {
        fontSize: "13px",
        fontWeight: 500,
        margin: "0 0 4px",
        lineHeight: 1.3,
        overflow: "hidden",
    },
    desc: {
        fontSize: "11px",
        margin: 0,
        lineHeight: 1.5,
        overflow: "hidden",
    },
};