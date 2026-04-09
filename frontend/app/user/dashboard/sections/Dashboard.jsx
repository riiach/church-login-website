"use client"

import SectionTemplateLeftRight from "@/components/SectionTemplateLeftRight";
import { usePCUser } from "@/context/profile";
import React from "react";
import Image from "next/image";
import Milestone from "@/components/Milestone";
import useBanner from "@/hooks/useBanner";
import ListCard from "@/components/ListCard";
import useRegisteredEvents from "@/hooks/useRegisteredEvents";

const Dashboard = () => {
    const { user, loading } = usePCUser();
    const { banner = [], isLoading } = useBanner("weekly_scripture");
    const { events: registeredEvents, isLoading: isLoadingRegisteredEvents } = useRegisteredEvents(user?.id);

    const weeklyScriptureBanner = banner[0] ?? null;

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>No user data</p>;
    if (isLoading || isLoadingRegisteredEvents) return <p>Loading...</p>;

    const imageSrc = weeklyScriptureBanner?.image_url;

    return (
        <section>
            <SectionTemplateLeftRight
                sectionTitle={`${user.name}'s Dashboard`}
                title={
                    <h1 className="py-2">
                        Hello,<span className="text-sweep active"> {user.name}!</span>
                    </h1>
                }
                description={
                    <div>
                        <p className="text-description mb-4">
                            Your journey with God continues here—track your growth, stay committed, and keep moving forward.
                        </p>
                        <div className="w-full h-68 rounded-2xl relative bg-gray-200 mb-4 overflow-hidden">
                            {weeklyScriptureBanner?.image_url && (
                                <Image
                                    src={imageSrc}
                                    alt="Weekly Scripture Banner"
                                    fill
                                    sizes="(max-width: 1280px) 100vw, 50vw"
                                    className="object-cover rounded-2xl"
                                    priority
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                            {weeklyScriptureBanner?.text_content && (
                                <div className="absolute inset-x-0 bottom-0 p-6">
                                    <p className="text-white font-medium leading-snug drop-shadow-sm">
                                        {weeklyScriptureBanner.text_content}
                                    </p>
                                </div>
                            )}
                        </div>
                        <Milestone />
                    </div>
                }
                link={
                    <a href={'https://home.planningcenteronline.com/'}
                       className="flex flex-row group overflow-hidden"
                    >
                        <p className="button-primary mr-2 group-hover:text-accent-text transition-all duration-300">Go
                            To Planning Center</p>
                        <button
                            className="button-tertiary group-hover:bg-foreground/10 group-hover:scale-103 stroke-2 fill-none stroke-foreground w-12 h-12"
                            type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M18 6L6 18M8 6h10v10"/>
                            </svg>
                        </button>
                    </a>
                }
                content={
                    registeredEvents.length > 0 ? (
                        <ListCard data={registeredEvents} eagerImageCount={3} />
                    ) : (
                        <h1 className="py-6 xl:px-4 text-3xl md:text-4xl xl:text-7xl">
                            No events yet. 
                            <br />
                            Join the community by registering for something upcoming.
                        </h1>
                    )
                }
            />
        </section>
    );
}

export default Dashboard;