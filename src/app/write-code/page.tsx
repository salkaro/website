// External Imports


// Local Imports
import LanguageSelection from "@/components/write-code/LanguageSelection";
import Layout from "@/components/layout/Layout";


export default function WriteCode() {
    return (
        <Layout>
            <div>
                <LanguageSelection name="Python" link="./write-code/python-code" />
            </div>
        </Layout>
    );
}
