import Hero from "./sections/Hero"
import Promote from "./sections/Promote"

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-[200vh] px-4 xl:px-10 2xl:px-18">
        <Hero />
        <Promote />
    </div>
  );
}
