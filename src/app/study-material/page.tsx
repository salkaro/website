// External Imports
import Link from "next/link";

// Local Imports
import Layout from "@/components/layout/Layout";


interface SubjectLinkProps {
    subject: string,
    route: string,
    description?: string,
}

const SubjectLink:React.FC<SubjectLinkProps> = ({ subject, route, description }) => {
  return (
    <Link href={`/study-material/${route}`} className="col-span-1 p-4 flex flex-col gap-1 text-center border border-gray-600 bg-darkGrey max-w-64">
        <span>{subject}</span>
        <span className="text-sm text-gray-300">{description ? description: `Study material for ${subject}`}</span>
    </Link>
  )
}


export default function StudyMaterial() {
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SubjectLink subject="Mathematics" route="mathematics" />
                <SubjectLink subject="Physics" route="physics" />
                <SubjectLink subject="Computer Science" route="computer-science" description="Study material for computing" />
                <SubjectLink subject="Chemistry" route="chemistry" />
                <SubjectLink subject="Biology" route="biology" />
                <SubjectLink subject="Uni Admissions" route="uni-admissions" description="Study material for admission tests" />
            </div>
        </Layout>
    );
}
