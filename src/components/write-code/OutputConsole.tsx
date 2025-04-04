import React from 'react'


interface OutputConsoleProps {
    output: string;
    className?: string;
}


const OutputConsole: React.FC<OutputConsoleProps> = ({ output, className }) => {
    return (
        <div id="output-console" className={`${className} bg-consoleGrey p-4 text-sm h-full w-full`}>
            <pre>
                {output}
            </pre>
        </div>
    )
}

export default OutputConsole
