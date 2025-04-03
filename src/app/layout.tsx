import Head from 'next/head';
import { Lato } from 'next/font/google';
import type { Metadata } from "next";

const lato = Lato({ weight: '900', style: 'normal', subsets: ['latin'] });

import '@/styles/globals.css';

export const metadata: Metadata = {
    title: "Salkaro",
    description: "Salkaro is your go-to platform for exploring the exciting world of programming, electronics, and simulations. Dive into hands-on projects, tutorials, and open-source resources that make learning and creating tech innovations accessible and fun. Whether you're a beginner or an expert, Salkaro offers tools and inspiration to fuel your next big idea.",
    openGraph: {
        title: "Salkaro",
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                {/* External CSS for CodeMirror */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/codemirror.min.css" />
                {/* External JS for CodeMirror */}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/codemirror.min.js" defer></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/mode/javascript/javascript.min.js" defer></script>
            </Head>
            <body className={`${lato.className} antialiased bg-offBlack text-white overflow-x-hidden scrollbar-hide`}>
                {children}
            </body>
        </html>
    );
}
