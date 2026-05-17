import SectionNavigator from '@/components/SectionNavigator'
import WhatWeBelieve from './sections/WhatWeBelieve'

// app/about/page.js
export const metadata = {
    title: "About Us | AIM",
    description: "Stay up to date with everything happening in our community.",
};

export default function AnnouncementPage() {
    return (
        <div className="min-h-screen w-screen bg-background pt-0 px-8 xl:px-16 2xl:px-28">
            <WhatWeBelieve />
            <SectionNavigator
                sections={[
                    { id: "whatWeBelieve", label: "What We Believe" },
                ]}
            />
        </div>
    );
}
