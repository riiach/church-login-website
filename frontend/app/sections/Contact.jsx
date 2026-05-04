"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import Image from "next/image";

import { useFirstPage } from '@/context/pageLoad';
import { sendContactEmail } from "@/lib/contact";

import SectionTemplateLeftRight from "@/components/SectionTemplateLeftRight";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    keyword: z.string().min(1, "Keyword is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
    const { firstPageLoaded } = useFirstPage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await sendContactEmail(data);
            toast.success("Your message has been sent successfully!");
            console.log("Form submitted successfully: ", data, "");
            reset();
        } catch (error) {
            toast.error("Failed to send your message. Please try again later.");
            console.log("Error sending form: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={`${firstPageLoaded ? 'block' : 'hidden'} w-full`}>
            <SectionTemplateLeftRight
                sectionTitle=""
                title={
                    <h1 className="pb-2">Get In Touch!</h1>
                }
                description={
                    <p className="text-description w-full h-auto py-4">
                        You're always welcome to reach out. 
                        <br />We're excited to connect with you!
                    </p>
                }
                link={
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full flex flex-col gap-4"
                    >
                        <div>
                            <input 
                                id="name"
                                type="text"
                                {...register("name")}
                                className={errors.name ? "border-red-500" 
                                    : "border border-foreground px-6 py-4 w-full xl:w-1/2 rounded-full text-sm md:text-base"
                                }
                                placeholder="Your Name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                id="email"
                                type="email"
                                {...register("email")}
                                className={errors.email ? "border-red-500"
                                    : "border border-foreground px-6 py-4 w-full xl:w-1/2 rounded-full text-sm md:text-base"
                                }
                                placeholder="Your Email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                id="keyword"
                                type="text"
                                {...register("keyword")}
                                className={errors.keyword ? "border-red-500" 
                                    : "border border-foreground px-6 py-4 w-full xl:w-1/2 rounded-full text-sm md:text-base"
                                }
                                placeholder="Subject"
                            />
                            {errors.keyword && (
                                <p className="text-red-500 text-sm">{errors.keyword.message}</p>
                            )}
                        </div>
                        <div>
                            <textarea
                                id="message"
                                {...register("message")}
                                className={errors.message ? "border-red-500" 
                                    : "border border-foreground px-6 py-4 w-full xl:w-1/2 rounded-2xl text-sm md:text-base"
                                }
                                placeholder="Your Message"
                                rows={4}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm">{errors.message.message}</p>
                            )}
                        </div>
                        <div className="w-full xl:w-1/2 flex justify-end py-2 px-2">
                            <button type="submit" disabled={isSubmitting} className="bg-foreground rounded-full hover:scale-103 stroke-2 fill-none stroke-foreground w-12 h-12 flex items-center justify-center transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 stroke-background">
                                    <path d="M18 6L6 18M8 6h10v10"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                }
                content={
                    <div className="w-full h-full py-4 flex-row px-6 gap-2 hidden xl:flex">
                        <div className="px-2 py-2 w-1/2 h-full">
                            <div className="w-full h-full flex rounded-2xl relative hover:scale-103 transition-all duration-300">
                                <Image
                                    src="/contact_promo.jpg"
                                    alt="Contact Promo"
                                    fill
                                    className="object-cover rounded-2xl"
                                    sizes="100vw"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>
                        
                        <div className="w-1/2 h-full flex flex-col gap-6 px-2 py-2">
                            <div className="w-full h-1/2 bg-foreground rounded-2xl flex flex-col items-start justify-between px-4 py-4 hover:scale-103 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full border border-white dark:border-black flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-background stroke-background" viewBox="0 0 16 20">
                                        <g fill="currentColor">
                                            <path d="M7.986 0C3.58 0 .01 3.516.01 7.852c0 5.155 6.485 12.12 7.976 12.12c1.49 0 7.975-6.77 7.975-12.12C15.96 3.516 12.39 0 7.986 0zM7.95 13.73c-3.136 0-5.677-2.503-5.677-5.59c0-3.086 2.541-5.589 5.677-5.589c3.135 0 5.676 2.503 5.676 5.59c0 3.086-2.541 5.589-5.676 5.589z"/>
                                            <path d="M7.95 3.631c-.141 0-.28.007-.418.02c.338.384.543.885.543 1.433c0 1.211-.997 2.193-2.227 2.193A2.23 2.23 0 0 1 3.87 6.09c-.32.615-.5 1.311-.5 2.05c0 2.49 2.05 4.509 4.58 4.509c2.529 0 4.58-2.019 4.58-4.51c0-2.49-2.051-4.509-4.58-4.509z"/>
                                        </g>
                                    </svg>
                                </div>
                                <p className="text-white dark:text-black text-2xl">
                                    27 Suyeong-ro 725beon-gil,
                                    <br />
                                    Suyeong-gu, Busan
                                </p>
                            </div>
                            <div className="w-full h-1/2 rounded-2xl relative hover:scale-103 transition-all duration-300">
                                <Image
                                src="/contact_promo_2.jpeg"
                                alt="Contact Promo"
                                fill
                                className="object-cover rounded-2xl"
                                sizes="100vw"
                                priority
                                unoptimized
                            />
                            </div>
                        </div>
                    </div>
                }
            >    
            </SectionTemplateLeftRight>    
        </section>
    );
}
