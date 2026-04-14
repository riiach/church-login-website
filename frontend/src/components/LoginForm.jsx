"use client"

import Image from "next/image"

import { getPlanningCenterRedirectUrl } from "@/lib/backend-url"

export default function LoginForm() {

    const handlePlanningCenterLogin = () => {
        window.location.href = getPlanningCenterRedirectUrl(window.location.href)
    }

    return (
        <div className="max-h-screen w-full -mt-16 xl:mt-16 flex items-center justify-center bg-background xl:px-4 reveal-down">
            <div className="flex flex-col xl:flex-row w-full xl:w-1/2 bg-white dark:bg-black/80 rounded-lg shadow-lg overflow-hidden">

                {/* Image Section */}
                <div className="relative w-full xl:block xl:w-1/2 min-h-[240px] sm:min-h-[300px] xl:min-h-[500px]">
                    <Image
                        src="https://images.pexels.com/photos/31105185/pexels-photo-31105185.jpeg"
                        alt="Banner"
                        fill
                        sizes="(max-width: 1280px) 100vw, 50vw"
                        className="object-cover"
                        priority
                    />
                </div>

                {/* OAuth Section */}
                <div className="w-full xl:w-1/2 p-8 flex flex-col justify-center">

                    <h2 className="text-2xl font-semibold text-foreground text-center">
                        Welcome to AIM
                    </h2>

                    <p className="text-foreground/70 text-center mt-2">
                        Sign in using Planning Center to continue
                    </p>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handlePlanningCenterLogin}
                            className="flex text-xs sm:text-base items-center justify-center w-full mt-8 border border-gray-300 rounded-lg py-3 hover:bg-foreground hover:text-accent-text transition duration-300"
                        >
                            Sign in with Planning Center
                        </button>

                        <button
                            onClick={handlePlanningCenterLogin}
                            className="flex text-xs sm:text-base items-center justify-center bg-accent w-full mt-2 border border-gray-300 rounded-lg py-3 hover:bg-accent/80 transition duration-300"
                        >
                            Register with Planning Center
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}