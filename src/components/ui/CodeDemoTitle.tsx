import React from 'react'


interface CodeDemoTitleProps {
    text: string;
}

const CodeDemoTitle:React.FC<CodeDemoTitleProps> = ({ text }) => {
  return (
        <h1 className='text-4xl'>
            {text}
        </h1>
  )
}

export default CodeDemoTitle
