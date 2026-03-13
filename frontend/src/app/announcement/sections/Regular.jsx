"use client"

import React from 'react'
import SectionTemplate from '@/components/SectionTemplate'
import useAnnouncement from "@/hooks/useAnnouncement.js";
import Carousel from '@/components/Carousel'
import List from '@/components/List'

const Regular = () => {
    const { announcement = [], isLoading } = useAnnouncement();

    const regularAnnouncement = announcement.filter((item) =>
        item.category === 'regular_announcement');

    if (isLoading) {
        return <p>Loading announcements...</p>
    }

    return (
        <div>
            <SectionTemplate
                sectionTitle="REGULAR ANNOUNCEMENT"
                title={
                    <h1 className="overflow-hidden pb-2">
                        Your weekly guide to what's happening at <span className="text-sweep">our church</span>
                    </h1>
                }
                description={
                    <p className="text-description">
                        Stay up to date with everything happening in our community.
                        From Sunday services to special events,
                        midweek gatherings and volunteer opportunities.
                        We've got all the details you need right here in one place.
                    </p>
                }
                promotion={
                    <Carousel />
                }
                content={
                    <List data={regularAnnouncement} />
                }
            />
        </div>
    )
}
export default Regular
