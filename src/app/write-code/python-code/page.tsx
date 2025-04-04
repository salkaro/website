// External Imports


// Local Imports
import CodeEditor from "@/components/write-code/CodeEditor";
import Layout from "@/components/layout/Layout";

export default function PythonCode() {
    return (
        <Layout>
            <div className="w-full h-screen flex flex-grow justify-center items-start">
                <CodeEditor key="" />
            </div>
        </Layout>
    );
}

