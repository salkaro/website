"use client"

import React from 'react'
import { Card, CardContent } from '../ui/card'


interface StudyOptionProps {
    name: string;
    link: string;
    icon: React.ReactNode
}


const StudyOption: React.FC<StudyOptionProps> = ({ name, link, icon }) => {
    return (
        <Card onClick={() => { window.location.replace(`/atlas/${link}/introduction`) }} className='hover:bg-muted/50 select-none p-6 sm:p-10 cursor-pointer'>
            <CardContent className='flex flex-col items-center justify-center gap-1'>
                {icon}
                <p>{name}</p>
            </CardContent>
        </Card>
    )
}

export default StudyOption
