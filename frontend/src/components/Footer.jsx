"use client";
import React from 'react'
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Footer = () => {
    return (
        <section id="footer" className="w-full min-h-100 flex flex-row flex-wrap bg-accent mt-8 xl:mt-46 px-8 2xl:px-24 py-12 gap-8 xl:gap-0">
            <div className="w-full xl:w-1/3 flex flex-col gap-4 xl:gap-12 items-start">
                <h1 className="py-2 text-white">
                    Across Cultures
                    <br/>United in Christ
                </h1>
                <div className="w-full h-86 rounded-2xl overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.5213661705006!2d129.11463677637673!3d35.16855587275709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356892d73a0de8a3%3A0x25065c057414883c!2s27%20Suyeong-ro%20725beon-gil%2C%20Suyeong-gu%2C%20Busan!5e0!3m2!1sen!2skr!4v1775148225933!5m2!1sen!2skr"
                        width="600"
                        height="450"
                        style={{ border:0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>

            <div className="flex flex-col justify-between w-full xl:w-2/3 min-h-full">
                <div className="w-full xl:h-2/3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:pl-48 md:items-start py-4">
                    <div className="order-1 mb-2 md:mb-8">
                        <p className="mb-4 menu">Home</p>
                        <ul className="subMenu">
                            <li>About Us</li>
                            <li>Services</li>
                            <li>Events</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div className="order-2 mb-2 md:mb-8">
                        <p className="mb-4 menu">Our Mission</p>
                        <ul className="subMenu">
                            <li>Our Mission</li>
                            <li>Statement</li>
                            <li>Leadership and Staff</li>
                        </ul>
                    </div>
                    <div className="order-3 mb-2 md:mb-8">
                        <p className="mb-4 menu">Visit Us</p>
                        <ul className="subMenu">
                            <li><Link href={"/"}>Service</Link></li>
                            <li>Children Ministry</li>
                            <li>Sooyoungro Church</li>
                        </ul>
                    </div>
                    <div className="order-4 mb-2 md:mb-8">
                        <p className="mb-4 menu">Sermons</p>
                        <ul className="subMenu">
                            <li>Series</li>
                            <li>Sermons</li>
                        </ul>
                    </div>
                    <div className="order-5 mb-2 md:mb-8">
                        <p className="mb-4 menu">Community</p>
                        <ul className="subMenu">
                            <li>Class</li>
                            <li>Service</li>
                            <li>Life Group</li>
                            <li>Social Media</li>
                        </ul>
                    </div>
                    <div className="order-6 mb-2 md:mb-8">
                        <p className="mb-4 menu">Announcement</p>
                        <ul className="subMenu">
                            <li>Regular</li>
                            <li>Events</li>
                            <li>Children</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4 xl:mt-0 xl:pl-48">
                    <div className="order-2 md:order-1 flex flex-col justify-end items-start gap-2">
                        <ThemeToggle />
                        <p className="text-gray-500 text-xs">&copy; 2026 AIM. All rights reserved.</p>
                    </div>

                    <div className="order-1 md:order-2 flex flex-col md:items-end">
                        <div className="flex flex-row gap-2 mb-2">

                            {/* Facebook */}
                            <a href="https://www.facebook.com/antioch.busan#">
                                <svg
                                    viewBox="0 0 88.78 160.72"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="#222222"
                                >
                                    <path d="M88.78,5.05v27.77s-31.13-8.41-32.82,12.62v18h32.82l-6.73,30.39h-26.09v65.21l-35.34,1.68v-67.32H0v-29.97h20.2S14.55,16.41,43.88,5.05c29.33-11.36,44.9,0,44.9,0Z"/>
                                </svg>
                            </a>

                            {/* Youtube */}
                            <a href="https://www.youtube.com/channel/UC8VgQsbpmNbZJuDEyAQpUcg?view_as=subscriber">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 14"
                                    className="w-6 h-6"
                                >
                                    <path fill="#222222" d="M8 1.5c-6.88 0-7 .62-7 5.5s.12 5.5 7 5.5s7-.62 7-5.5s-.12-5.5-7-5.5Zm2.24 5.74L7.1 8.74c-.28.13-.5-.02-.5-.33V5.59c0-.31.23-.46.5-.33l3.14 1.5c.28.13.28.35 0 .48Z"/>
                                </svg>
                            </a>

                            {/* Kakaotalk */}
                            <a href="https://pf.kakao.com/_pxiXtxb">
                                <svg
                                    viewBox="0 0 163.96 149.7"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                >
                                    <path
                                        d="M163.96,63.26c0,34.94-36.7,63.27-81.98,63.27-3.38,0-6.72-.16-9.99-.47l-37.17,23.23c-2.18,1.36-4.72-.92-4.06-3.64l7.05-29.08C15.07,105.33,0,85.65,0,63.26,0,28.32,36.7,0,81.98,0s81.98,28.32,81.98,63.26Z"
                                        fill="#222222"
                                    />

                                    <g className="fill-accent">
                                        <path d="M31.97,53.28h-10.69v-6.23h28.95v6.23h-10.65v28.94h-7.61v-28.94Z"/>
                                        <path d="M57.72,74.09l-2.74,8.13h-7.48l11.95-35.18h9.55l12.46,35.18h-8l-2.89-8.13h-12.85ZM68.93,67.86c-2.5-7.42-4.09-12.17-4.94-15.33h-.05c-.87,3.47-2.62,8.99-4.63,15.33h9.62Z"/>
                                        <path d="M85.98,47.04h7.61v28.94h17.52l-.87,6.23h-24.26v-35.18Z"/>
                                        <path d="M115.62,47.04h7.52v15.7c2.32-2.71,9.56-10.64,14.01-15.7h9.11l-14.14,14.62,14.65,20.56h-9.12l-10.79-15.63-3.71,3.55v12.08h-7.52v-35.18Z"/>
                                    </g>
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a href="https://www.instagram.com/aim_busan/">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#222222">
                                    <path fill="#222222" d="M194.4 211.7a53.3 53.3 0 1 0 59.2 88.6a53.3 53.3 0 1 0-59.2-88.6m142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9.1-11.2.1s-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1.1 7.9.1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1s7.2 0 11.4.1c25.5.3 64.8.7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1.1-11.4c.3-25.5.7-64.9-6.5-83c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5c18.1 12.1 30.6 30.9 34.9 52.2s-.2 43.5-12.3 61.6c-6 9-13.7 16.6-22.6 22.6s-19 10.1-29.6 12.2c-21.3 4.2-43.5-.2-61.6-12.3s-30.6-30.9-34.9-52.2s.2-43.5 12.2-61.6s30.9-30.6 52.2-34.9s43.5.2 61.6 12.2h.1zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64zm-91 293c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z"/>
                                </svg>
                            </a>
                        </div>
                        <a
                            href="tel:+82517146541"
                            className="underline text-[#222222] text-sm"
                        >051-714-6541</a>
                        <a
                            href="mailto:aimbusan@gmail.com"
                            className="underline text-[#222222] text-sm"
                        >aimbusan@gmail.com</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Footer
