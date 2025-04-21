"use client";

import Title from "../ui/title";
import Input from "./Input";

import { useState } from "react";

const Page = () => {
    const [status, setStatus] = useState<string>("");
    const [ip, setIp] = useState<{address: string, family: number}>();

    return (
        <div className="min-h-screen flex flex-col items-center justify-start mt-24">
            <Title title="Is This Website Down?" subTitle="Check Website Status Instantly"/>
            <div className="text-center">
                <Input setStatus={setStatus} setIp={setIp}/>
            </div>

            {status && (
                <div className="mt-4 text-lg font-semibold text-center">
                    <p>{status}</p>
                    <p>{ip ? `IPv${ip.family}: ${ip.address}` : ""}</p>
                </div>
            )}
        </div>
    )
}

export default Page
