import Layout from "@/components/layout/Layout";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Privacy Policy | Salkaro",
    description: "Read Salkaro's Privacy Policy to understand how we collect, use, and protect your personal information. Your privacy is important to us, and we are committed to maintaining transparency in all our practices.",
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

export default function PrivacyPolicy() {
    return (
        <Layout>
            <Link href="https://www.termsfeed.com/live/1b08e4ef-d956-49b3-bd82-0e118b8110ce" target="_blank">Privacy Policy</Link>
        </Layout>
    );
}
