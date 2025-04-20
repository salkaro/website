import React from 'react'
import Bubble from './Bubble'

import { FaCode } from "react-icons/fa";
import { GrGamepad } from "react-icons/gr";
import { LuBookText } from "react-icons/lu";
import { FaGithubAlt } from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { MdOutlineFindInPage } from "react-icons/md";

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
                <Bubble tooltipText="Write Code Online" icon={<FaCode />} link="/write-code" tooltipLeft />
            </div>
            <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2'>
                <Bubble tooltipText="Study Materials" icon={<LuBookText />} link="/study-material" />
            </div>
            <div className='absolute bottom-10 right-10'>
                <Bubble tooltipText="Open Source Repo" icon={<FaGithubAlt />} link="https://github.com/salkaro" tooltipLeft />
            </div>
            <div className='absolute top-1/2 mt-6 sm:mt-0 left-10'>
                <Bubble tooltipText="Check A Websites Status" icon={<IoGlobeOutline />} link="https://isitdown.salkaro.com/" />
            </div>
            <div className='absolute top-2/3 right-20 sm:right-40'>
                <Bubble tooltipText="Automate eBay Selling" icon={<MdOutlineSell />} link="https://flippify.io?ref=salkaro" tooltipLeft />
            </div>
            <div className='absolute top-16 right-0 sm:right-40'>
                <Bubble tooltipText="Online Timer" icon={<MdOutlineTimer />} link="https://timer.salkaro.com" tooltipLeft />
            </div>
            <div className='absolute bottom-32 sm:bottom-1/4 left-1/4'>
                <Bubble tooltipText="Word Finder" icon={<MdOutlineFindInPage />} link="https://wordfinder.salkaro.com" />
            </div>
        </div>
    )
}

export default Page
