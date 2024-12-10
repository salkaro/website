import { Metadata } from "next";

import "@/styles/glare-text.css"
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
    title: "Salkaro",
    description: "Salkaro is your go-to platform for exploring the exciting world of programming, electronics, and simulations. Dive into hands-on projects, tutorials, and open-source resources that make learning and creating tech innovations accessible and fun. Whether you're a beginner or an expert, Salkaro offers tools and inspiration to fuel your next big idea.",
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
};

export default function Home() {
    return (
        <Layout>
            <div className="">
                Salkaro - For a curious mind
            </div>
        </Layout>
    );
}
