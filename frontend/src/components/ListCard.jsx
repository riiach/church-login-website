import React from 'react'
import Image from "next/image";

const ListCard = ( {data} ) => {
    return (
        <div className="flex flex-col gap-4 xl:px-2 xl:py-2">
            {data.map((item, index) => (
                <div
                    className="flex flex-row justify-between items-start w-full h-full rounded-xl p-6 shadow-sm hover:shadow-md bg-white dark:bg-black/80 card overflow-hidden"
                    key={index}
                >
                    <div className="w-auto flex flex-col justify-between items-start">
                        <div className="flex flex-col items-start">
                            <p className={item.event_date === null ? 'hidden' : 'block text-foreground/80'}>{item.event_date}</p>
                            <p className="text-foreground/80">{item.location}</p>
                        </div>
                        <div className="flex flex-col gap-4 mt-8">
                            <div className="text-subtitle">
                                {item.title}
                            </div>
                            <div className="text-description">
                                {item.description}
                            </div>
                        </div>
                    </div>

                    <div className="w-auto shrink-0 flex justify-start items-start ml-4 overflow-hidden">
                        <div className="w-12 h-12 rounded-full bg-foreground/10 flex justify-center items-center overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={48}
                                height={48}
                                unoptimized
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ListCard
