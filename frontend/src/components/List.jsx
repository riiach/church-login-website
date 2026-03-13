"use client";

import React, { useState } from 'react'
import Image from "next/image";

/*
const mockData = [
    {
        title: "Sunday Worship Service",
        description: "Join us for a time of worship, prayer, and the Word. All are welcome to come and experience God's presence together as a community.",
        eventDate: "2024-03-17",
        location: "Main Sanctuary, 2nd Floor",
        image: "https://images.pexels.com/photos/16718734/pexels-photo-16718734.jpeg"
    },
    {
        title: "Youth Bible Study",
        description: "A weekly gathering for teens and young adults to dive deep into Scripture, ask questions, and grow together in faith.",
        eventDate: "2024-03-19",
        location: "Room 204, Education Building",
        image: null
    },
    {
        title: "Community Outreach Day",
        description: "We will be serving our local neighborhood through food distribution, cleanup, and sharing the love of Christ in practical ways.",
        eventDate: "2024-03-23",
        location: "City Park, Main Entrance",
        image: null
    },
    {
        title: "Easter Sunday Celebration",
        description: "Celebrate the resurrection of Jesus Christ with special music, a powerful message, and a time of fellowship with your church family.",
        eventDate: "2024-03-31",
        location: "Main Sanctuary, 2nd Floor",
        image: null
    },
    {
        title: "Women's Prayer Breakfast",
        description: "A morning of prayer, worship, and encouragement for all women of the church. Breakfast will be provided. Come expecting a move of God.",
        eventDate: "2024-04-06",
        location: "Fellowship Hall, Ground Floor",
        image: null
    },
];
 */

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const AddButton = ({ open, setOpen }) => (
    <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-8 h-8 shrink-0 relative z-50 bg-foreground/10 rounded-full hover:drop-shadow-md transition-all duration-300 ease-in-out"
    >
        <span className={`absolute block w-3 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${open ? 'rotate-[135deg]' : 'rotate-0'}`} />
        <span className={`absolute block w-0.5 h-3 bg-foreground transition-all duration-300 ease-in-out ${open ? 'rotate-[135deg]' : 'rotate-0'}`} />
    </button>
);

const ListItem = ({ item }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full border-b border-foreground/10">
            <div className="py-4 flex justify-between items-center">
                <p className="font-semibold text-base font-manrope text-primary">{item.title}</p>
                <AddButton open={open} setOpen={setOpen} />
            </div>
            <div className={`overflow-hidden flex flex-col xl:flex-row gap-4 transition-all duration-300 ease-in-out ${open ? 'max-h-96 pb-4' : 'max-h-0'}`}>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/60 font-inter">
                        <span>📅</span>
                        <p>{formatDate(item.event_date)}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/60 font-inter">
                        <span>📍</span>
                        <p>{item.location}</p>
                    </div>
                    <p className="text-sm text-foreground/80 mt-1 font-inter">{item.description}</p>
                </div>
                <div className={`relative h-auto min-h-48 w-1/3 rounded-2xl ${item.image === null ? 'hidden' : 'block'}`}>
                    {item.image && (
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                    )}
                </div>
            </div>
        </div>
    );
};

const List = ( { data }) => {
    return (
        <div className="w-full">
            {data.map((item, index) => (
                <ListItem key={index} item={item} />
            ))}
        </div>
    );
};

export default List;