import React from 'react'
import Image from 'next/image';

const ministries = [
    {
        name: 'Impact Youth',
        label: 'Youth',
        image: 'https://images.pexels.com/photos/36729904/pexels-photo-36729904.jpeg',
        description: 'Youth Group exists to teach teenagers the Word of God and help them rise up and fight as the divine soldiers of God in this rebellious world.',
        link: '/ministries/youth'
    },
    {
        name: 'International Children Ministry',
        label: 'Children',
        image: 'https://images.pexels.com/photos/12047478/pexels-photo-12047478.jpeg',
        description: 'International Children Ministry exists to train and equip children to walk in the ways of the Lord and to stand up as bold disciples of Jesus Christ.',
        link: '/ministries/youth'
    },
    {
        name: 'Ministry Teams',
        label: 'Team',
        image: 'https://images.pexels.com/photos/4349834/pexels-photo-4349834.jpeg',
        description: 'Our super teams to make the community run',
        link: '/ministries/youth'
    }
]

const MinistriesCard = ({ currentPage = 0 }) => {
    return (
        <div className="relative flex flex-row gap-6 h-100 overflow-hidden">

            {ministries.map((item, index) => {
                const isActive = index === currentPage;

                return (
                    <div
                        key={index}
                        className={`
                            relative rounded-2xl overflow-hidden
                            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                            ${isActive ? 'flex-[2]' : 'flex-1 h-80'}
                        `}
                    >
                        {/* IMAGE */}
                        <div className="relative h-full w-full overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.label}
                                fill
                                className="object-cover"
                                unoptimized
                            />

                            {/* 🔥 BLACK GRADIENT OVERLAY */}
                            <div className={`
                                absolute inset-0
                                bg-gradient-to-t from-black/70 via-black/20 to-transparent
                                transition-opacity duration-500
                                ${isActive ? 'opacity-100' : 'opacity-0'}
                            `} />

                            {/* LABEL */}
                            <div className="absolute top-6 left-6 px-4 py-2 bg-black/30 border border-white rounded-full">
                                <p className="text-white">{item.label}</p>
                            </div>

                            {/* TEXT */}
                            <div
                                className={`
                                    absolute inset-0 flex flex-col justify-end p-6
                                    transition-all duration-500
                                    ${isActive
                                    ? 'opacity-100 translate-y-0 delay-300'
                                    : 'opacity-0 translate-y-4 pointer-events-none delay-0'}
                                `}
                            >
                                <h1
                                    className={`
                                    text-white text-3xl pb-2 transition-all duration-500 ease-out
                                    ${isActive
                                        ? 'opacity-100 translate-y-0 delay-300'
                                        : 'opacity-0 translate-y-2 delay-0'}
                                    `}
                                >
                                    {item.name}
                                </h1>

                                <p
                                    className={`
                                    text-white/80 text-sm transition-all duration-500 ease-out
                                    ${isActive
                                        ? 'opacity-100 translate-y-0 delay-500'
                                        : 'opacity-0 translate-y-2 delay-0'}
                                    `}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default MinistriesCard