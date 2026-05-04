import Contact from "./sections/Contact";
import Hero from "./sections/Hero"
import Promote from "./sections/Promote"
import { FirstPageProvider } from "@/context/pageLoad";

// app/page.js
export const metadata = {
    title: "AIM Church | Home",
    description: "We are an English-speaking international church in Busan, welcoming expats, students, and locals looking for a Christian community.",
};

export default function Home() {
  return (
    <FirstPageProvider>
      <div className="flex flex-col w-screen h-auto px-4 xl:px-10 2xl:px-18">
        <Hero />
        <Promote />
        <Contact />
      </div>
    </FirstPageProvider>
  );
}
