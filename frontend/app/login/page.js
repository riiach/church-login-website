import LoginForm from "@/components/LoginForm";
import Image from "next/image";

// app/logIn/page.js
export const metadata = {
    title: "Log In | AIM",
    description: "Log In to Stay Updated",
};

export default function LoginPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] w-full bg-background px-8 xl:px-16 2xl:px-28 flex items-center justify-center">
            <LoginForm />
        </div>
    );
}