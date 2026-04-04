"use client"

import Image from "next/image"

export default function LoginForm() {

    const handlePlanningCenterLogin = () => {
        console.log("BACKEND:", process.env.NEXT_PUBLIC_BACKEND_URL)

        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/planning-center/redirect`
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 reveal-down">
            <div className="flex w-1/2 max-w-4xl bg-white dark:bg-black/80 rounded-lg shadow-lg overflow-hidden">

                {/* Image Section */}
                <div className="relative hidden lg:block lg:w-1/2 min-h-[500px]">
                    <Image
                        src="https://images.pexels.com/photos/34442266/pexels-photo-34442266.jpeg"
                        alt="Banner"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* OAuth Section */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">

                    <h2 className="text-2xl font-semibold text-foreground text-center">
                        Welcome to AIM
                    </h2>

                    <p className="text-foreground/70 text-center mt-2">
                        Sign in using Planning Center to continue
                    </p>

                    <button
                        onClick={handlePlanningCenterLogin}
                        className="flex items-center justify-center w-full mt-8 border rounded-lg py-3 hover:bg-gray-50 transition"
                    >
                        Sign in with Planning Center
                    </button>

                </div>

            </div>
        </div>
    )
}