"use client"

// External Imports
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

// Local Imports
import { readTextFile } from "@/utils/read-text-file";
import CodeDemoTitle from "@/components/ui/CodeDemoTitle";
import CodeEditor from "@/components/ui/CodeEditor";
import Layout from "@/components/layout/Layout";



const formatSegment = (segment: string | undefined) => {
    if (!segment) return "Code Demo";
    return segment
        .split("-") // Split by hyphens
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Join with spaces
};


export default function WebLayoutsFooter() {
    const [fileContent, setFileContent] = useState("");
    const [editorWidth, setEditorWidth] = useState("0px"); 
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [fontSize, setFontSize] = useState(17);
    const [lineCount, setLineCount] = useState(0);

    // Get the current path
    const pathname = usePathname();
    const lastSegment = formatSegment(pathname.split("/").pop());

    useEffect(() => {
        // Fetch the file content
        const fetchFileContent = async () => {
            const content = await readTextFile(`/code-demos/${lastSegment}.txt`);
            if (content) {
                setFileContent(content);
                const lines = content.split("\n"); // Split content by newlines
                setLineCount(lines.length); // Set the line count
            } else {
                setFileContent("Failed to load content");
                setLineCount(0); // No lines if content is empty or failed to load
            }
        };
        fetchFileContent();

        // Function to update the width of the editor dynamically
        const updateEditorWidth = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth - 24;
                
                if (width < 500) {
                    setFontSize(12)
                } else if (width < 800) {
                    setFontSize(14)
                }

                setEditorWidth(`${width}px`);
            }
        };

        updateEditorWidth(); // Set the initial width
        window.addEventListener("resize", updateEditorWidth); // Update width on window resize

        return () => window.removeEventListener("resize", updateEditorWidth); // Cleanup
    }, [lastSegment]);


    return (
        <Layout>
            <div className="w-full h-full flex flex-col items-center py-16 gap-16">
                <div>
                    <CodeDemoTitle text={lastSegment}/>
                </div>
                <div ref={containerRef} className="p-4 bg-[#272822] rounded-lg w-full md:max-w-4xl">
                    <CodeEditor mode="typescript" code={fileContent} readOnly={true} width={editorWidth} height={`${(fontSize+3.2) * lineCount}px`} fontSize={fontSize} />
                </div>
            </div>
        </Layout>
    );
}