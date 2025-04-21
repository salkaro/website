// External Imports
import { Metadata } from "next";

// Local Imports
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
    title: "FAQs | Salkaro",
    description: "Find answers to frequently asked questions about Salkaro — how it works, how to contribute, what tech we use, and what's coming next.",
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

export default function FAQs() {
    return (
        <Layout>
            <div className="h-full max-w-2xl grow flex flex-col gap-2">
                <h1 className="text-6xl my-12">FAQs</h1>

                <div className="space-y-8 text-md text-gray-200">
                    <div>
                        <h2 className="font-semibold text-2xl mb-2 text-white">What is Salkaro?</h2>
                        <p>Salkaro is a growing collection of tiny websites and tools that are useful, fun, or just plain interesting. From checking if a site is down to playing mini games or experimenting with code—each micro-site lives under the <code className="bg-gray-800 px-1 rounded">*.salkaro.com</code> umbrella.</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-2xl mb-2 text-white">Is it free to use?</h2>
                        <p>Yep! Everything on Salkaro is completely free to use. We believe in open access, open source, and building for the community.</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-2xl mb-2 text-white">Can I contribute?</h2>
                        <p>Absolutely. Salkaro is open source and always looking for contributors—whether it’s building new mini-sites, fixing bugs, suggesting ideas, or improving existing ones.
                            <br/>Check out our GitHub repo here: <a href="https://github.com/YOUR_REPO_LINK" className="text-blue-600 hover:underline">GitHub</a></p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-2xl mb-2 text-white">I have an idea for a new micro-site. Can I suggest it?</h2>
                        <p>Yes, please! We love ideas. You can open an issue on our GitHub or message us directly with your idea.</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-2xl mb-2 text-white">What&apos;s the tech stack?</h2>
                        <p>Most of the Salkaro sites are built using NextJS. Everything is open source and designed to be lightweight and simple.</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-2xl mb-2 text-white">What kind of projects are you planning next?</h2>
                        <p>More games, productivity tools, creative coding experiments, and community-built mini-apps. We want Salkaro to be a fun, growing playground of the internet.</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-2xl mb-2 text-white">Is there a code editor or live coding environment?</h2>
                        <p>Yes! You can write and run code directly in your browser using our online editor on salkaro.com. Great for testing, learning, or quick experiments.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}