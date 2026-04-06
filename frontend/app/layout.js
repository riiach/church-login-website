import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {PCUserProvider} from "@/context/profile";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import Social from "@/components/Social";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});

export const metadata = {
  title: "AIM",
  description: "Antioch International Ministry",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
            <PCUserProvider>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <Social />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
            </PCUserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
