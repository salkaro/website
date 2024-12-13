"use client";

// External Imports
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSpring, animated } from '@react-spring/web';

// Local Imports
import ButtonToCircle from '@/components/copy-text/ButtonToCircle';

export default function CopyTextPage() {
    const searchParams = useSearchParams();
    const text = searchParams.get("p");
    const [shrink, setShrink] = useState(false);

    // Shrink animation using numeric values to completely shrink the input
    const shrinkAnimation = useSpring({
        width: shrink ? 0 : 'auto', // Shrinks the input until it disappears (width 0)
        opacity: shrink ? 0 : 1, // Fade out as it shrinks
        config: { 
            tension: 200, 
            friction: 15,
        },
    });

    const handleCopy = async () => {
        if (text) {
            try {
                await navigator.clipboard.writeText(text);
                setShrink(true); // Trigger the shrink effect
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    return (
        <div className="text-white min-h-screen flex flex-col justify-center items-center gap-8">
            <div className="text-lg flex flex-col sm:flex-row justify-center items-center gap-4">
                <animated.input
                    className="border px-4 py-2 rounded-lg bg-darkGrey whitespace-nowrap border-black text-sm h-[40px] focus:ring-0 focus:border-transparent focus:outline-none"
                    value={text || "No text to copy"}
                    readOnly
                    style={shrinkAnimation} // Apply shrink animation
                />
                {/* Center the button when input is shrinking */}
                <div className={`${shrink ? "absolute" : ""} flex justify-center items-center`}>
                    {text && (
                        <ButtonToCircle text="Copy" onClick={handleCopy} />
                    )}
                </div>
            </div>
        </div>
    );
}
