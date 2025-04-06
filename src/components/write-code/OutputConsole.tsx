import React from 'react'


interface OutputConsoleProps {
    output: string;
    className?: string;
}


const OutputConsole: React.FC<OutputConsoleProps> = ({ output, className }) => {
    return (
        <div className={`${className} text-sm h-full w-full`}>
            <div className='w-full p-2'>
                <h1 className='font-bold text-gray-500'>Output</h1>
            </div>
            <hr className='border-gray-500'/>

            <div className='p-4 w-full'>
                <pre
                    id="output-console"
                    className="flex flex-col whitespace-pre-wrap"
                    style={{ margin: 0, padding: 0 }}
                    dangerouslySetInnerHTML={{ __html: output }}
                />
            </div>
        </div>
    )
}

export default OutputConsole
