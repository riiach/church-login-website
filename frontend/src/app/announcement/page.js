import Regular from './sections/Regular'
import Event from './sections/Event'
import Children from './sections/Children'
import SectionNavigator from '@/components/SectionNavigator'

// app/announcement/page.js
export const metadata = {
    title: "Announcements | AIM",
    description: "Stay up to date with everything happening in our community.",
};

export default function AnnouncementPage() {
    return (
        <div className="min-h-screen w-screen bg-background pt-0 px-8 xl:px-16 2xl:px-28">
            <Regular />
            <Event />
            <Children />
            <SectionNavigator
                sections={[
                { id: "regularAnnouncement", label: "Regular Announcement" },
                { id: "event", label: "Event" },
                { id: "childrenAnnouncement", label: "Children Ministry" },
                ]}
            />
        </div>
    );
}
