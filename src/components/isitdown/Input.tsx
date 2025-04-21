"use client";

// Local Imports
import LoadingSpinner from "../ui/LoadingSpinner";

// External Imports
import { getReasonPhrase } from 'http-status-codes';
import { useState } from "react"


interface InputProps {
    setStatus: (status: string) => void;
}

const Input: React.FC<InputProps> = ({ setStatus }) => {
    const [url, setUrl] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    async function handleOnClick() {
        setStatus("");
        if (!url) {
            setStatus("Please enter a URL.");
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`/api/isitdown?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (data.down) {
                setStatus(`The site is down (status: ${data.status || "unknown"}). ${getReasonPhrase(data.status)}`);
            } else {
                setStatus(`The site is up (status: ${data.status}).`);
            }
        } catch (error) {
            console.log(error);
            setStatus("Error checking the website. Please try again.");
        }

        setLoading(false);
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            handleOnClick();
        }
    }

    return (
        <div className="relative flex flex-row items-center gap-4 min-w-xs sm:min-w-sm md:min-w-md lg:min-w-lg xl:min-w-xl 2xl:min-w-2xl">
            <input
                type="text"
                placeholder="Enter a URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-black placeholder-gray-600 w-full px-6 py-5 text-lg transition duration-200 ease-in-out transform border-transparent rounded-full bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-hidden focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />

            <button
                type="button"
                onClick={() => handleOnClick()}
                className="absolute right-6 bg-slate-800 text-white py-1 px-4 rounded-full h-10 font-semibold"
            >
                <span className="flex items-center justify-center w-12">
                    {loading ? <LoadingSpinner /> : "Check"}
                </span>
            </button>
        </div>
    )
}

export default Input
