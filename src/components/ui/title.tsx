import React from 'react'

interface TitleProps {
    title: string;
    subTitle: string;
}

const Title: React.FC<TitleProps> = ({ title, subTitle }) => {
    return (
        <div className="text-center my-16">
            <h1 className="text-5xl md:text-8xl font-bold text-(--color-title) mb-2">{title}</h1>
            <p className="text-md md:text-lg font-semibold mb-4">{subTitle}</p>
        </div>
    )
}

export default Title
