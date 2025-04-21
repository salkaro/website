// External Imports
import { Metadata } from "next";


// Local Imports
import CodeEditor from "@/components/write-code/CodeEditor";
import Layout from "@/components/layout/Layout";


export const metadata: Metadata = {
    title: "C++ Online | Salkaro",
    description: "Try C++ coding directly in your browser with Salkaro's online C++ code editor. Write, test, and debug C++ code in an interactive environment without any setup required. Perfect for beginners and experienced developers alike.",
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


export default function CPPCode() {
    return (
        <Layout>
            <CodeEditor language="cpp" />
        </Layout>
    );
}

