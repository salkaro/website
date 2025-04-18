// External Imports

import { Metadata } from "next";

// Local Imports
import LanguageSelection from "@/components/write-code/LanguageSelection";
import Layout from "@/components/layout/Layout";


export const metadata: Metadata = {
    title: "Write Code Online | Salkaro",
    description: "Access Salkaro's online code editor to write, run, and test code in multiple programming languages, including Python. Ideal for developers, learners, and anyone wanting to practice coding in a browser-based environment.",
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


export default function WriteCode() {
    return (
        <Layout>
            <div>
                <LanguageSelection name="Python" link="./write-code/python" />
            </div>
        </Layout>
    );
}
