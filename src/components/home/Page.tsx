import React from 'react'
import Bubble from './Bubble'

import { FiCodepen } from "react-icons/fi";
import { GrGamepad } from "react-icons/gr";
import { FaCode } from "react-icons/fa";
import { LuBookText } from "react-icons/lu";
import { FaGithubAlt } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";

const Page = () => {
    return (
        <div className='relative min-h-screen max-w-6xl w-screen flex items-center justify-center'>
            {/* Main content */}
            <div className="text-white text-lg font-bold absolute z-10">
                Salkaro - For a curious mind
            </div>

            {/* Bubbles */}
            <div className='absolute top-10 left-10'>
                <Bubble tooltipText="Visit Games" icon={<GrGamepad />} link="https://games.salkaro.com" />
            </div>
            <div className='absolute top-1/4 right-10'>
                <Bubble tooltipText="Learn To Code" icon={<FaCode />} link="/coding-learn" />
            </div>
            <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2'>
                <Bubble tooltipText="Study Materials" icon={<LuBookText />} link="/study-material" />
            </div>
            <div className='absolute bottom-1/4 left-1/4'>
                <Bubble tooltipText="Code Demos" icon={<FiCodepen className='text-xl' />} link="/code-demos" />
            </div>
            <div className='absolute bottom-10 right-10'>
                <Bubble tooltipText="Open Source Repo" icon={<FaGithubAlt />} link="https://github.com/salkaro" />
            </div>
            <div className='absolute top-1/2 left-10'>
                <Bubble tooltipText="Check A Websites Status" icon={<IoGlobeOutline />} link="https://isitdown.salkaro.com/" />
            </div>
        </div>
    )
}

export default Page
