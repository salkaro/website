// External Imports
import Link from "next/link";
import { Metadata } from "next";

// Local Imports
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
    title: "About | Salkaro",
    description: "Salkaro is a collection of tiny websites, tools, code demos, and games—all under one playful domain. Build, explore, and contribute to open-source micro-projects or experiment with code in your browser.",
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};


export default function About() {
    return (
        <Layout>
            <div className="h-full max-w-2xl flex-grow flex flex-col gap-2">
                <h1 className="text-6xl my-12">About Salkaro</h1>

                <p className="text-md mb-6">
                    <strong>Salkaro is a growing collection of tiny, useful, and fun websites.</strong>
                    From checking if a website is down, to setting a timer, to playing small games—we build simple tools that make life a bit easier or just a bit more fun.
                </p>
                <p className="text-md mb-6">
                    Each mini-site lives under the umbrella of <code className="bg-gray-800 px-1 rounded">*.salkaro.com</code>. Think of it like a digital playground, constantly expanding with small but mighty projects.
                </p>
                <p className="text-md mb-6">
                    We’re open source and open to ideas. You can explore, contribute, or even suggest what we should build next. Head over to our
                    <a href="https://github.com/salkaro" className="text-blue-600 hover:underline"> GitHub repo</a> to get involved.
                </p>
                <h2 className="text-2xl font-semibold mt-10 mb-4">Some things we’ve built so far:</h2>
                <ul className="list-disc list-inside space-y-2 text-md">
                    <li>
                        <Link href="https://isitdown.salkaro.com" className="text-blue-600 hover:underline">isitdown.salkaro.com</Link> — check if a website is down
                    </li>
                    <li>
                        <Link href="https://timer.salkaro.com" className="text-blue-600 hover:underline">timer.salkaro.com</Link> — set timers for focus or fun
                    </li>
                    <li>
                        <Link href="https://games.salkaro.com" className="text-blue-600 hover:underline">games.salkaro.com</Link> — simple games for breaks or boredom
                    </li>
                    <li>
                        <Link href="/code-demos" className="text-blue-600 hover:underline">Code Demos</Link> — see live examples of small code experiments
                    </li>
                    <li>
                        <Link href="/write-code" className="text-blue-600 hover:underline">Online Editor</Link> — write and run code directly in your browser
                    </li>
                </ul>
                <p className="text-md mt-8">
                    And we’re just getting started.<br />
                    Have an idea? Want to help build? Let’s make the internet a little cooler—one tiny tool at a time.
                </p>
            </div>
        </Layout>
    );
}
