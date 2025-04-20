"use client";

import Input from "./Input";

import { useState } from "react";

const Page = () => {
    const [status, setStatus] = useState<string>("");

    return (
        <div className="min-h-screen flex flex-col items-center justify-start mt-24">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">Is This Website Down?</h1>
                <p className="text-md font-semibold mb-4">Check Website Status Instantly</p>
            </div>
            <div className="text-center">
                <Input setStatus={setStatus} />
            </div>

            {status && (
                <div className="mt-4 text-lg font-semibold text-center">
                    {status}
                </div>
            )}
        </div>
    )
}

export default Page
