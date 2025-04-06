// External Imports
import Link from "next/link";

// Local Imports
import Layout from "@/components/layout/Layout";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Code Demos | Salkaro",
    description: "Explore a variety of interactive code demos on Salkaro, including examples of common UI components like navigation bars and footers. Learn by viewing and experimenting with live code snippets.",
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}


export default function CodeDemos() {
    return (
        <Layout>
            <div className="flex flex-col gap-2 items-center justify-center text-center">
                <Link href="./code-demos/navbar">Navbar</Link>
                <Link href="./code-demos/footer">Footer</Link>
            </div>
        </Layout>
    );
}
