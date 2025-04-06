import Layout from "@/components/layout/Layout";

export default function NotFound() {
    return (
        <Layout>
            <h1 className="text-4xl mb-2">404 - Page Not Found</h1>
            <p>Could not find requested resource</p>
        </Layout>
    );
}