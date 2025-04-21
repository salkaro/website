// External Imports
import { Metadata } from "next";
import { FaPython } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

// Local Imports
import LanguageSelection from "@/components/write-code/LanguageSelection";
import { Separator } from "@/components/ui/separator";
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
    const cppIcon = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="white" width="50" height="50" viewBox="0 0 50 50"><path d="M 43.910156 12.003906 L 27.070313 2.539063 C 25.792969 1.824219 24.207031 1.824219 22.929688 2.539063 L 6.089844 12.003906 C 4.800781 12.726563 4 14.082031 4 15.535156 L 4 34.464844 C 4 35.917969 4.800781 37.273438 6.089844 37.996094 L 22.929688 47.460938 C 23.570313 47.820313 24.285156 48 25 48 C 25.714844 48 26.429688 47.820313 27.070313 47.460938 L 43.910156 37.996094 C 45.199219 37.273438 46 35.917969 46 34.464844 L 46 15.535156 C 46 14.082031 45.199219 12.726563 43.910156 12.003906 Z M 25 37 C 18.382813 37 13 31.617188 13 25 C 13 18.382813 18.382813 13 25 13 C 28.78125 13 32.273438 14.753906 34.542969 17.742188 L 30.160156 20.277344 C 28.84375 18.835938 26.972656 18 25 18 C 21.140625 18 18 21.140625 18 25 C 18 28.859375 21.140625 32 25 32 C 26.972656 32 28.84375 31.164063 30.160156 29.722656 L 34.542969 32.257813 C 32.273438 35.246094 28.78125 37 25 37 Z M 37 26 L 35 26 L 35 28 L 33 28 L 33 26 L 31 26 L 31 24 L 33 24 L 33 22 L 35 22 L 35 24 L 37 24 Z M 44 26 L 42 26 L 42 28 L 40 28 L 40 26 L 38 26 L 38 24 L 40 24 L 40 22 L 42 22 L 42 24 L 44 24 Z"></path></svg>
    return (
        <Layout>
            <div className="flex flex-col gap-6 min-h-screen md:min-w-xl mt-16">
                <div>
                    <p className="text-xl">Languages</p>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LanguageSelection name="Python" link="./write-code/python" icon={<FaPython className="text-3xl" />} />
                    <LanguageSelection name="Javascript" link="./write-code/javascript" icon={<IoLogoJavascript className="text-3xl" />} />
                    <LanguageSelection name="C++" link="./write-code/cpp" icon={cppIcon} />
                </div>
            </div>
        </Layout>
    );
}
