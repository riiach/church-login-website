"use client";

import React, { useState } from 'react'
import Image from "next/image";

const formatTime = (time) => {
    if (!time) return null;
    const [h, m] = time.split(":");
    const date = new Date();
    date.setHours(h, m);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

const formatEvent = (event) => {
    const startDate = event.event_date ? new Date(event.event_date) : null;
    const endDate = event.end_date ? new Date(event.end_date) : null;

    const dateOptions = { month: "long", day: "numeric", year: "numeric" };

    const start = startDate ? startDate.toLocaleDateString("en-US", dateOptions) : null;
    const end = endDate ? endDate.toLocaleDateString("en-US", dateOptions) : null;

    const time =
        event.start_time && event.end_time
            ? `${formatTime(event.start_time)} – ${formatTime(event.end_time)}`
            : null;

    return {
        date: start ? (end ? `${start} – ${end}` : start) : null,
        time,
        location: event.location
    };
};

const AddButton = ({ open, setOpen }) => (
    <button
        onClick={() => setOpen(!open)}
        className="button-tertiary w-8 h-8 hover:drop-shadow-md"
    >
        <span className={`absolute block w-3 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${open ? 'rotate-[135deg]' : 'rotate-0'}`} />
        <span className={`absolute block w-0.5 h-3 bg-foreground transition-all duration-300 ease-in-out ${open ? 'rotate-[135deg]' : 'rotate-0'}`} />
    </button>
);

const ListItem = ({ item }) => {
    const [open, setOpen] = useState(false);
    const event = formatEvent(item);

    return (
        <div className="w-full border-b border-foreground/10">
            <div className="py-4 flex justify-between items-center">
                <p className="font-semibold text-base font-manrope text-primary">{item.title}</p>
                <AddButton open={open} setOpen={setOpen} />
            </div>
            <div className={`overflow-hidden flex flex-col xl:flex-row xl:justify-between gap-4 transition-all duration-300 ease-in-out ${open ? 'max-h-126 pb-4' : 'max-h-0'}`}>
                <div className="flex flex-col gap-2">
                    <div className={`items-center gap-2 text-sm text-foreground/60 font-inter overflow-hidden
                    ${item.event_date === null ? 'hidden' : 'flex'}
                    `}>
                        <span>📅</span>
                        <p>{event.date}</p>
                    </div>
                    <div className={`items-center gap-2 text-sm text-foreground/60 font-inter overflow-hidden
                    ${item.start_time === null ? 'hidden' : 'flex'}
                    `}>
                        <span>⏰</span>
                        <p>{event.time}</p>
                    </div>
                    <div className={`items-center gap-2 text-sm text-foreground/60 font-inter overflow-hidden
                    ${item.location === '' ? 'hidden' : 'flex'}
                    `}>
                        <span>📍</span>
                        <p>{item.location}</p>
                    </div>
                    <p className="text-sm text-foreground/80 mt-1 font-inter overflow-hidden">{item.description}</p>
                </div>
                <div className={`relative h-auto aspect-square w-1/2 lg:max-w-1/3 xl:max-w-1/4 rounded-2xl ${item.image === null ? 'hidden' : 'block'}`}>
                    {item.image && (
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            className="object-cover"
                        />
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