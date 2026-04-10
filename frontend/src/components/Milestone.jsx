"use client"

import React, { useCallback, useEffect, useState } from "react";
import useSeries from "@/hooks/useSeries"

const LINE_DURATION_MS = 900;
const CIRCLE_START_DELAY_MS = 140;
const CIRCLE_STAGGER_MS = 140;
const TEXT_START_DELAY_MS = 180;
const TEXT_STAGGER_MS = 110;

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

const statusConfig = {
    done: {
        label: "Done",
        marker: {
            background: "rgba(180, 178, 169, 0.75)",
            boxShadow: "0 0 0 5px rgba(180, 178, 169, 0.14), 0 0 14px rgba(180, 178, 169, 0.28)",
        },
    },
    active: {
        label: "In progress",
        marker: {
            background: "#a2e861",
            boxShadow: "0 0 0 6px rgba(162, 232, 97, 0.18), 0 0 18px rgba(162, 232, 97, 0.42)",
        },
    },
    upcoming: {
        label: "Upcoming",
        marker: {
            background: "rgba(180, 178, 169, 0.75)",
            boxShadow: "0 0 0 5px rgba(180, 178, 169, 0.12), 0 0 12px rgba(180, 178, 169, 0.24)",
        },
    },
};

const lightStatusConfig = {
    done: {
        label: "Done",
        marker: {
            background: "rgba(255, 255, 255, 0.82)",
            boxShadow: "0 0 0 5px rgba(255, 255, 255, 0.12), 0 0 14px rgba(255, 255, 255, 0.26)",
        },
    },
    active: {
        label: "In progress",
        marker: {
            background: "#ffffff",
            boxShadow: "0 0 0 6px rgba(255, 255, 255, 0.16), 0 0 18px rgba(255, 255, 255, 0.34)",
        },
    },
    upcoming: {
        label: "Upcoming",
        marker: {
            background: "rgba(255, 255, 255, 0.82)",
            boxShadow: "0 0 0 5px rgba(255, 255, 255, 0.12), 0 0 14px rgba(255, 255, 255, 0.24)",
        },
    },
};

function MilestoneItem({ date, status, title, chapter, animate, circleDelay, textDelay, configMap, textClassName }) {
    const config = configMap[status];
    const chapterText = typeof chapter === "string" ? chapter.trim() : "";

    return (
        <div style={styles.item} className="basis-[140px] min-w-[140px] sm:basis-[180px] sm:min-w-[180px]">
            <div
                style={{
                    ...styles.marker,
                    ...config.marker,
                    ...(animate ? styles.markerVisible : styles.markerHidden),
                    transitionDelay: `${circleDelay}ms`,
                }}
            />

            <div
                style={{
                    ...styles.content,
                    ...(animate ? styles.contentVisible : styles.contentHidden),
                    transitionDelay: `${textDelay}ms`,
                }}
            >
                <p style={styles.date} className={textClassName.date}>{date}</p>
                <p style={styles.title} className={textClassName.title}>{title}</p>
                {chapterText !== "" && (
                    <p style={styles.desc} className={textClassName.desc}>{chapterText}</p>
                )}
            </div>
        </div>
    );
}

export default function MilestoneDiagram({ colorScheme = "default", align = "center" }) {
    const { series = [], isLoading } = useSeries();
    const [containerElement, setContainerElement] = useState(null);
    const [isAnimated, setIsAnimated] = useState(false);
    const isLight = colorScheme === "light";
    const isStartAligned = align === "start";
    const configMap = isLight ? lightStatusConfig : statusConfig;
    const textClassName = isLight
        ? {
            date: "text-white/80",
            title: "text-white",
            desc: "text-white",
        }
        : {
            date: "text-foreground/70",
            title: "text-foreground",
            desc: "text-foreground",
        };

    const containerRef = useCallback((node) => {
        setContainerElement(node);
    }, []);

    const today = getToday();

    const milestones = [...series]
        .sort((left, right) => (left.order ?? 0) - (right.order ?? 0))
        .map((item) => {
            const startDate = parseDateOnly(item.start_date);
            const endDate = parseDateOnly(item.end_date);

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
                chapter: item.chapter,
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
        return <p className={isLight ? "text-white" : "text-foreground"}>Loading series...</p>
    }

    const lastCircleDelay = milestones.length > 0
        ? LINE_DURATION_MS + CIRCLE_START_DELAY_MS + ((milestones.length - 1) * CIRCLE_STAGGER_MS)
        : LINE_DURATION_MS;

    const textStartDelay = lastCircleDelay + TEXT_START_DELAY_MS;

    return (
        <div
            ref={containerRef}
            style={{
                ...styles.card,
                ...(isStartAligned ? styles.cardStart : null),
            }}
            className="py-8"
        >
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
                            ...(isLight ? styles.trackSweepLineLight : null),
                            ...(isAnimated ? styles.trackSweepLineVisible : styles.trackSweepLineHidden),
                        }}
                        className="overflow-hidden"
                    />
                    {milestones.map((m, i) => (
                        <MilestoneItem
                            key={i}
                            {...m}
                            configMap={configMap}
                            textClassName={textClassName}
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
    cardStart: {
        margin: "0",
    },
    timeline: {
        width: "100%",
        maxWidth: "100%",
        display: "block",
        overflowX: "auto",
        overflowY: "visible",
        paddingTop: "0.75rem",
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
        overflow: "visible",
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
    trackSweepLineLight: {
        background: "#ffffff",
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
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 1,
        overflow: "visible",
    },
    marker: {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        flexShrink: 0,
        transition: "transform 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease, box-shadow 240ms ease, background 240ms ease",
        boxSizing: "border-box",
        willChange: "transform, opacity",
        overflow: "hidden",
    },
    markerHidden: {
        opacity: 0,
        transform: "scale(0.35)",
    },
    markerVisible: {
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
        fontFamily: "var(--font-manrope), 'Segoe UI', sans-serif",
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