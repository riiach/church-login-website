"use client"

import React, { useEffect, useState } from 'react'
import SectionTemplateTopBottom from "@/components/SectionTemplateTopBottom"
import VideoCard from "@/components/VideoCard"

const Sermons = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [pageDirection, setPageDirection] = useState(0);
    const [videosPerPage, setVideosPerPage] = useState(8);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");

        const updateVideosPerPage = (event) => {
            setVideosPerPage(event.matches ? 2 : 8);
            setCurrentPage(0);
        };

        updateVideosPerPage(mediaQuery);

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", updateVideosPerPage);

            return () => mediaQuery.removeEventListener("change", updateVideosPerPage);
        }

        mediaQuery.addListener(updateVideosPerPage);

        return () => mediaQuery.removeListener(updateVideosPerPage);
    }, []);

    useEffect(() => {
        if (pageCount === 0) {
            return;
        }

        setCurrentPage((page) => Math.min(page, pageCount - 1));
    }, [pageCount]);

    const scrollCards = (direction) => {
        if (pageCount === 0) {
            return;
        }

        setCurrentPage((page) => {
            const nextPage = page + direction;
            let boundedPage = nextPage;

            if (nextPage < 0) {
                boundedPage = 0;
            }

            if (nextPage >= pageCount) {
                boundedPage = pageCount - 1;
            }

            if (boundedPage !== page) {
                setPageDirection(direction);
            }

            return boundedPage;
        });
    };

    return (
        <section id="sermons" className="w-full h-auto flex flex-col py-4">
            <SectionTemplateTopBottom
                sectionTitle="PAST SERMONS"
                title={
                    <h1 className="overflow-hidden pb-2">
                        Watch our latest sermons
                    </h1>
                }
                description={
                    <a href={'https://www.youtube.com/channel/UC8VgQsbpmNbZJuDEyAQpUcg?view_as=subscriber'}
                       className="flex flex-row group overflow-hidden"
                       target="_blank"
                    >
                        <p className="button-primary mr-2 group-hover:text-accent-text transition-all duration-300" >Go To Our Channel</p>
                        <button className="button-tertiary group-hover:bg-foreground/10 group-hover:scale-103 stroke-2 fill-none stroke-foreground w-12 h-12" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M18 6L6 18M8 6h10v10"/>
                            </svg>
                        </button>
                    </a>
                }
                content={
                    <VideoCard
                        currentPage={currentPage}
                        videosPerPage={videosPerPage}
                        pageDirection={pageDirection}
                        onPageCountChange={setPageCount}
                    />
                }
            />
            <div className="flex w-full items-end justify-end gap-3 pt-8 overflow-hidden ">
                <button
                    type="button"
                    onClick={() => scrollCards(-1)}
                    disabled={currentPage === 0}
                    className="button-tertiary h-12 w-12 stroke-2 fill-none stroke-foreground hover:bg-foreground/10 hover:scale-103 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Scroll sermons left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                        <path d="M15 6 9 12l6 6" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => scrollCards(1)}
                    disabled={pageCount === 0 || currentPage >= pageCount - 1}
                    className="button-tertiary h-12 w-12 stroke-2 fill-none stroke-foreground hover:bg-foreground/10 hover:scale-103 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Scroll sermons right"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                        <path d="m9 6 6 6-6 6" />
                    </svg>
                </button>
            </div>
        </section>
    )
}

export default Sermons
