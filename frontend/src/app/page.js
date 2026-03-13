import Hero from "./sections/Hero"
import Promote from "./sections/Promote"

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-[200vh]">
        <Hero />
        <Promote />
    </div>
  );
}
