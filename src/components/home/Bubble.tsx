"use client";

// External Imports
import { useRouter } from 'next/navigation';
import React from 'react'


// Styles
import "@/styles/bubble-border-animation.css"


interface BubbleProps {
    tooltipText: string;
    link: string;
    icon: JSX.Element;
}

const Bubble: React.FC<BubbleProps> = ({ tooltipText, link, icon }) => {
    const router = useRouter();

    function handleClick() {
        router.push(link);
    }

    return (
        <div className="relative group">
            {/* Tooltip */}
            <div className="pointer-events-none absolute left-full top-1/2 border-white/60 px-3 py-2 bg-white/20 transform -translate-y-1/2 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm rounded shadow-md whitespace-nowrap ml-2">
                {tooltipText}
            </div>
            {/* Bubble */}
            <div
                onClick={handleClick}
                className="relative rounded-full hover:scale-110 transition-all duration-500 ease-in-out hover:cursor-pointer"
            >
                {/* Animated top border */}
                <div className="absolute inset-[-3px] w-[calc(100%+6px)] h-[calc(100%+6px)] rounded-full before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-white/30 before:animate-[spin_8s_linear_infinite] before:[clip-path:polygon(0%_0%,100%_0%,100%_75%,0%_75%)]"></div>
                <div
                    className="rounded-full border border-white/20 p-[14px] bg-white/20 hover:bg-white/40 hover:scale-110 transition-all duration-500 ease-in-out flex items-center justify-center cursor-pointer shadow-lg shadow-black/30"
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default Bubble
