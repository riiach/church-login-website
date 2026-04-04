'use client'
import React, { useRef } from 'react'
import useEvent from '@/hooks/useEvent.js'
import { useSweepInView } from '@/hooks/useSweepInView.js'
import Card from '@/components/Card'
import SectionTemplateTopBottom from "@/components/SectionTemplateTopBottom";

const Event = () => {
    {/* useSweepInView */}
    const { sectionRef, textRef } = useSweepInView();

    {/* useEvent */}
    const { event = [], isLoading } = useEvent();

    if (isLoading) {
        return <p>Loading announcements...</p>
    }
    return (
        <section id="event" ref={sectionRef}>
            <SectionTemplateTopBottom
                sectionTitle="EVENT"
                title={
                    <h1 className="overflow-hidden pb-2">
                        Connect with our community through
                        <span className="text-sweep" ref={textRef}> upcoming events</span>
                    </h1>
                }
                description={
                    <a href={'https://www.instagram.com/aim_busan/'}
                       className="flex flex-row group overflow-hidden"
                    >
                        <p className="button-primary mr-2 group-hover:text-accent-text transition-all duration-300" >Stay Updated</p>
                        <button className="button-tertiary group-hover:bg-foreground/10 group-hover:scale-103 stroke-2 fill-none stroke-foreground w-12 h-12" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M18 6L6 18M8 6h10v10"/>
                            </svg>
                        </button>
                    </a>
                }
                content={
                <Card data={event} />
                }
            />
        </section>
    )
}
export default Event
