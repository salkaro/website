// Local Imports
import Layout from "@/components/layout/Layout";
import StudyOption from "@/components/atlas/StudyOption";
import { Separator } from "@/components/ui/separator";

// External Imports
import { Atom, Dna, Earth, FlaskConical, GraduationCap, Sigma, SquareTerminal } from "lucide-react";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Study Material | Salkaro",
    description: "Access a wide range of study materials for A-Levels, GCSEs, and SATs on Salkaro. Our resources include practice questions and notes for Physics, Maths, and Computer Science to help you succeed in your exams and assessments.",
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



export default function StudyMaterial() {
    return (
        <Layout>
            <div className="flex flex-col gap-6 min-h-screen md:min-w-2xl mt-16">
                <div>
                    <p className="text-xl">Standard</p>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StudyOption name="Mathematics" link="standard/mathematics" icon={<Sigma />} />
                    <StudyOption name="Physics" link="standard/physics" icon={<Atom />} />
                    <StudyOption name="Computer Science" link="standard/computer-science" icon={<SquareTerminal />} />
                    <StudyOption name="Chemistry" link="standard/chemistry" icon={<FlaskConical />} />
                    <StudyOption name="Biology" link="standard/biology" icon={<Dna />} />
                    <StudyOption name="Uni Admissions" link="standard/uni-admissions" icon={<GraduationCap />} />
                </div>
                <div>
                    <p className="text-xl">Basic</p>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StudyOption name="Mathematics" link="basic/mathematics" icon={<Sigma />} />
                    <StudyOption name="Physics" link="basic/physics" icon={<Atom />} />
                    <StudyOption name="Computer Science" link="basic/computer-science" icon={<SquareTerminal />} />
                    <StudyOption name="Chemistry" link="basic/chemistry" icon={<FlaskConical />} />
                    <StudyOption name="Biology" link="basic/biology" icon={<Dna />} />
                    <StudyOption name="Geography" link="basic/geography" icon={<Earth />} />
                </div>
            </div>

        </Layout>
    );
}
