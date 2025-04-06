// External Imports
import { Metadata } from 'next';

// Local Imports
import { CopyText } from '@/components/copy-text/CopyText';
import Layout from '@/components/layout/Layout';


export const metadata: Metadata = {
    title: "Copy Text | Salkaro",
    description: "Quickly share and copy any text with a simple link. Use /copy-text?p=yourtext to generate a page where anyone can copy the text with one click.",
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

export default function CopyTextPage() {
    return (
        <Layout>
            <CopyText />
        </Layout>
    );
}