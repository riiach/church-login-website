"use client"

import React, {useEffect, useState} from 'react'
import SectionTemplateTopBottom from "@/components/SectionTemplateTopBottom";
import { useSweepInView } from '@/hooks/useSweepInView.js'
import MinistriesCard from "@/components/MinistriesCard";

const Promote = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(3);
    const [pageDirection, setPageDirection] = useState(0);

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

    {/* useSweepInView */}
    const { sectionRef, textRef } = useSweepInView();

    return (
        <section id="promote" ref={sectionRef}>
            <SectionTemplateTopBottom
                sectionTitle="MINISTRY"
                title = {
                    <h1 className="overflow-hidden pb-2">
                        Nurturing every generation in
                        <span className="text-sweep" ref={textRef}> faith and community</span>
                    </h1>
                }
                description={
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
                }
                content={
                    <div className="flex flex-col">
                        <MinistriesCard currentPage={currentPage} />

                        <div className="w-full h-auto flex justify-end mt-8">
                            <a href={'/ministry'}
                               className="flex flex-row group overflow-hidden"
                            >
                                <p className="button-primary mr-2 group-hover:text-accent-text transition-all duration-300" >Find Out More</p>
                                <button className="button-tertiary group-hover:bg-foreground/10 group-hover:scale-103 stroke-2 fill-none stroke-foreground w-12 h-12" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                                        <path d="M18 6L6 18M8 6h10v10"/>
                                    </svg>
                                </button>
                            </a>
                        </div>
                    </div>

                }
            />
        </section>
    )
}
export default Promote
