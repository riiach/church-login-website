"use client";

import React from "react";
import Image from "next/image";
import useEventRegistration from "@/hooks/useEventRegistration";
import Alert from "@/components/Alert";

const CardItem = ({ item }) => {
    const {
        registerUser,
        unregisterUser,
        remaining,
        isLoading,
        registeredState,
        isFull,
        message
    } = useEventRegistration(item.id);

    const handleRegister = () => {
        registerUser();
    };

    const handleUnregister = () => {
        unregisterUser();
    };

    return (
        <div
            className="w-full h-100 rounded-xl
            flex flex-col justify-between
            p-6 shadow-sm
            bg-white dark:bg-black/80 text-foreground
            group"
        >
            {/* Top Section */}
            <div className="w-full h-1/3 flex flex-row justify-between">
                <div className="relative aspect-square h-full rounded-full group-hover:scale-96 transition-all duration-300">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                    />
                </div>

                <div className="w-1/2 h-full flex flex-col justify-start items-end gap-4 ">
                    <button
                        onClick={registeredState ? handleUnregister : handleRegister}
                        disabled={isLoading || isFull}
                        className={`button-fourth transition-all duration-300
                            ${isLoading || isFull ? "opacity-40 cursor-not-allowed" : ""}
                            ${
                                                    registeredState
                                                        ? "bg-accent text-black hover:bg-foreground hover:text-background border-none"
                                                        : "text-foreground hover:bg-foreground hover:text-background"
                                                }
                        `}
                    >
                        {
                            registeredState
                                ? "Unregister"
                                : isFull
                                ? "Full"
                                : "Register"
                        }
                    </button>
                    <Alert message={message}/>

                    <div className="flex flex-col items-end pr-2">
                        {item.description && (
                            <p className="text-foreground/80">
                                {item.event_date}
                            </p>
                        )}
                        <p className="text-foreground/80">
                            {item.location}
                        </p>

                        {/* Optional remaining slots display */}
                        {remaining !== null && remaining > 0 && (
                            <p className="text-sm text-foreground/60">
                                {remaining === 1
                                    ? "1 spot left"
                                    : `${remaining} spots left`}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col justify-end gap-4">
                <p className="text-subtitle">{item.title}</p>

                {item.description && <hr />}

                {item.description && <p>{item.description}</p>}
            </div>
        </div>
    );
};

const Card = ({ data }) => {
    return (
        <div
            className="w-full h-auto grid grid-cols-1
            md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {data.map((item) => (
                <CardItem
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    );
};

export default Card;