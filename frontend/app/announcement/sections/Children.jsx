"use client"

import React from 'react'
import SectionTemplateLeftRight from "@/components/SectionTemplateLeftRight";
import ListCard from "@/components/ListCard";
import useAnnouncement from "@/hooks/useAnnouncement.js";
import List from '@/components/List';
import { useSweepInView } from '@/hooks/useSweepInView.js'

const Children = () => {
    const { announcement = [], isLoading } = useAnnouncement();

    {/* useSweepInView */}
    const { sectionRef, textRef } = useSweepInView();

    console.log("Announcements:", announcement);

    const childrenGeneral = announcement.filter((item) =>
        item.category === 'childrens_ministry_general'
    );

    const childrenAnnouncement = announcement.filter((item) =>
        item.category === 'childrens_ministry_announcement'
    );

    if (isLoading) {
        return <p>Loading announcements...</p>
    }

    return (
        <section id="childrenAnnouncement" ref={sectionRef}>
            <SectionTemplateLeftRight
                sectionTitle="CHILDREN MINISTRY ANNOUNCEMENT"
                title={
                    <h1 className="overflow-hidden pb-2">
                        Everything happening in our <span className="text-sweep" ref={textRef}>Children's Ministry</span>
                    </h1>
                }
                description={
                    <p className="text-description">
                        Keep up with weekly lessons, special activities,
                        and upcoming events for kids.
                        Our children's ministry is designed to help children
                        grow in faith while building friendships and having fun.
                    </p>
                }
                link={
                    <a href={'/'}
                       className="flex flex-row group overflow-hidden"
                    >
                        <p className="button-primary mr-2 group-hover:text-accent-text transition-all duration-300" >Find Out More</p>
                        <button className="button-tertiary group-hover:bg-foreground/10 group-hover:scale-103 stroke-2 fill-none stroke-foreground w-12 h-12" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M18 6L6 18M8 6h10v10"/>
                            </svg>
                        </button>
                    </a>
                }
                content={
                    <div>
                        <ListCard data={childrenGeneral} />
                        <div className="py-2 px-2">
                            <List data={childrenAnnouncement} />
                        </div>
                    </div>

                }
            />
        </section>
    )
}
export default Children
