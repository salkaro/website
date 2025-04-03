import { Metadata } from "next";

import "@/styles/glare-text.css"
import Layout from "@/components/layout/Layout";
import Page from "@/components/home/Page";

export const metadata: Metadata = {
    title: "Salkaro | For a curious mind",
    description: "Salkaro is your go-to platform for exploring the exciting world of programming, electronics, and simulations. Dive into hands-on projects, tutorials, and open-source resources that make learning and creating tech innovations accessible and fun. Whether you're a beginner or an expert, Salkaro offers tools and inspiration to fuel your next big idea.",
    openGraph: {
        title: "Salkaro | For a curious mind",
        description: "Salkaro is your go-to platform for exploring the exciting world of programming, electronics, and simulations. Dive into hands-on projects, tutorials, and open-source resources that make learning and creating tech innovations accessible and fun. Whether you're a beginner or an expert, Salkaro offers tools and inspiration to fuel your next big idea.",
        url: "https://salkaro.com",
        images: [
            {
                url: "https://i.imgur.com/hiNM6Ht.png",
                width: 2496,
                height: 1221,
                alt: "Is This Website Down? Check Website Status Instantly - Salkaro",
            }
        ]
    },
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
            <div className="min-h-screen w-full flex items-center justify-center">
                <Page />
            </div>
        </Layout>
    );
}
