import Link from 'next/link';
import React from 'react';


interface AttributionBlockProps {
    item: string,
    author: string,
    source: string,
    message: string,
    license: string,
    url: string
}


const AttributionBlock: React.FC<AttributionBlockProps> = ({ item, author, source, message, license, url }) => {
    return (
        <div className="p-8 flex flex-col gap-6 border border-gray-600 bg-darkGrey rounded-md">
            <div className='flex flex-col gap-1'>
                <span className='text-lg'>{item}</span>
                <span className='text-md text-gray-400'>- Designed by {author}</span>
            </div>

            <span className='text-sm text-gray-100'>{message}</span>

            <div className='flex flex-col gap-1'>
                <p className="text-sm text-gray-500">
                    <strong>Source: </strong>
                    <Link href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700 transition-colors duration-200">
                        {source}
                    </Link>
                </p>
                <p className="text-sm text-gray-500"><strong>License:</strong> {license}</p>
            </div>

        </div>
    );
};

export default AttributionBlock;