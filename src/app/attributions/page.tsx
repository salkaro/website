// External Imports
import { Metadata } from "next";

// Local Imports
import AttributionBlock from "@/components/attributions/AttributionBlock";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
    title: "Salkaro - Attributions",
    description: "Salkaro has not created everything on this site. This page contain all the material which we have used and their creators.",
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

export default function Attributions() {
    return (
        <Layout>
            <div className="flex flex-col gap-16">
                <AttributionBlock
                    item="Logo Squirrel SVG"
                    author="Freepik"
                    license="Free"
                    source="Freepik"
                    message="Massive shoutout to Freepik we love this svg!!"
                    url="https://www.freepik.com/free-vector/hand-drawn-squirrel-silhouette_49273567.htm#fromView=search&page=1&position=19&uuid=2d29f97d-e7b1-4966-9730-4607e21f1e87"
                />
            </div>
        </Layout>
    );
}
