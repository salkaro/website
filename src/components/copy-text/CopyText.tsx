"use client";

// External Imports
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useSpring, animated } from '@react-spring/web';

// Local Imports
import ButtonToCircle from '@/components/copy-text/ButtonToCircle';


export function CopyText() {
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
        <Suspense fallback={<p>Loading...</p>}>
            <div className="h-full max-w-2xl flex-grow flex flex-col gap-2">
                <div className='flex flex-col items-center justify-center gap-4 my-12'>
                    <h1 className='text-6xl'>Copy Text</h1>
                    
                </div>
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

                <div className="mt-12 space-y-2">
                    <p>To use this page type <code className='p-1 bg-gray-800 rounded-lg'>https://salkaro.com/copy-text?p=*</code></p>
                    <p>We do not store any of the text</p>
                </div>
            </div>
        </Suspense>
    );
}