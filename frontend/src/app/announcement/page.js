import Regular from './sections/Regular'

// app/announcement/page.js
export const metadata = {
    title: "Announcements | AIM",
    description: "Stay up to date with everything happening in our community.",
};

export default function AnnouncementPage() {
    return (
        <div className="min-h-screen w-screen bg-background pt-0 px-8 xl:px-16 2xl:px-28">
            <Regular />
        </div>
    );
}
