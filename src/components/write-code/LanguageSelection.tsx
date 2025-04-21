"use client"

// External Imports
import { Card, CardContent } from '../ui/card';


interface LanguageSelectionProps {
    name: string;
    link: string;
    icon: React.ReactNode
}


const LanguageSelection: React.FC<LanguageSelectionProps> = ({ name, link, icon }) => {
    return (
        <Card onClick={() => { window.location.replace(link) }} className='hover:bg-muted/50 select-none p-6 sm:p-10 cursor-pointer'>
            <CardContent className='flex flex-col items-center justify-center gap-1'>
                {icon}
                <p>{name}</p>
            </CardContent>
        </Card>
    )
}

export default LanguageSelection

