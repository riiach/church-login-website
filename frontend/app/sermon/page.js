import Series from './sections/Series';
import Sermons from './sections/Sermons';
import SectionNavigator from '@/components/SectionNavigator'

// app/sermon/page.js
export const metadata = {
    title: "Sermons | AIM",
    description: "Stay up to date with everything happening in our community.",
};

export default function SermonPage() {
    return (
        <div className="min-h-screen w-screen bg-background pt-0 px-8 xl:px-16 2xl:px-28">
            <Series />
            <Sermons />
            <SectionNavigator
                sections={[
                    { id: "series", label: "Series" },
                    { id: "sermons", label: "Sermons" },
                ]}
            />
        </div>
    );
}
