// External Imports
import { Metadata } from "next";


// Local Imports
import CodeEditor from "@/components/write-code/CodeEditor";
import Layout from "@/components/layout/Layout";


export const metadata: Metadata = {
    title: "Python Online | Salkaro",
    description: "Try Python coding directly in your browser with Salkaro's online Python code editor. Write, test, and debug Python code in an interactive environment without any setup required. Perfect for beginners and experienced developers alike.",
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


export default function PythonCode() {
    return (
        <Layout>
            <CodeEditor language="python" />
        </Layout>
    );
}

