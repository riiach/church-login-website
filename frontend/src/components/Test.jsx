"use client";

import Image from "next/image";
import { usePCUser } from "@/context/profile";

export default function Test() {
    const { user, loading } = usePCUser();

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>No user data</p>;

    return (
        <div className="flex items-center gap-4 w-full h-full">
            {user.profile_photo && (
                <Image
                    src={user.profile_photo}
                    alt={user.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                />
            )}
            <div>
                <p className="font-bold">{user.name}</p>
                <p>{user.email}</p>
                {user.phone && <p>{user.phone}</p>}
            </div>
        </div>
    );
}