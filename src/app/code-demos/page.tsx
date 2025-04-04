// External Imports
import Link from "next/link";

// Local Imports
import Layout from "@/components/layout/Layout";

export default function CodeDemos() {
    return (
        <Layout>
            <div className="flex flex-col gap-2 items-center justify-center text-center">
                <Link href="./code-demos/navbar">Navbar</Link>
                <Link href="./code-demos/footer">Footer</Link>
            </div>
        </Layout>
    );
}
