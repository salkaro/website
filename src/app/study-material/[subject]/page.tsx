"use client"

// External Imports
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';


// Local Imports
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Layout from "@/components/layout/Layout";


interface MaterialLinkProps {
    pdf: string,
    url: string,
}

const MaterialLink: React.FC<MaterialLinkProps> = ({ pdf, url }) => {
    return (
        <Link href={url} target="_blank" className="col-span-1 text-center text-gray-300 text-sm hover:underline">
            <span>{pdf}</span>
        </Link>
    )
}


export default function SubjectMaterial() {
    const pathname = usePathname();

    // Extract the subject name from the URL path (assuming the URL is like /study-material/{subject})
    const subject = pathname?.split('/')[2];

    const [material, setMaterial] = useState([]);  // State to store the material data

    useEffect(() => {
        if (!subject) return;  // Wait for the subject to be available

        // Fetch the study material for the subject from the API
        fetch(`/api/materials?url=${subject}`)
            .then((res) => res.json())
            .then((data) => setMaterial(data))  // Update state with the fetched data
            .catch((error) => console.error('Error fetching materials:', error));  // Handle error if any
    }, [subject]);  // Re-fetch data whenever the subject changes


    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl p-16">
                {material.length === 0 ? (
                    <LoadingSpinner />  // Show loading text if data is still being fetched
                ) : (
                    // Display topics and PDFs dynamically
                    material.map((item: { topic: string, pdfs: string[] }) => (
                        <div key={item.topic} className='flex flex-col items-center px-4 gap-2 '>
                            <h3 className="text-xl font-bold">{item.topic}</h3>
                            {item.pdfs.map((pdf) => (
                                <MaterialLink
                                    key={pdf}
                                    pdf={pdf}
                                    url={`/study-material/${subject}/${item.topic}/${pdf}`}  // Dynamic link to the PDF
                                />
                            ))}
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}
