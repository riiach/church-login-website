import React from "react";
import Dashboard from "./sections/Dashboard";

// app/dashboard/page.js
export const metadata = {
    title: "Dashboard | AIM",
    description: "Your Dashboard",
};

export default function DashboardPage() {
    return (
        <div className="min-h-screenbg-background pt-0 px-8 xl:px-16 2xl:px-28">
            <Dashboard />
        </div>
    );
}