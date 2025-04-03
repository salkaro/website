// External Imports


// Local Imports
import LanguageSelection from "@/components/coding-learn/LanguageSelection";
import Layout from "@/components/layout/Layout";


export default function CodingLearn() {
    return (
        <Layout>
            <div>
                <LanguageSelection name="Python" link="./coding-learn/python-tutorial"/>
            </div>
        </Layout>
    );
}
