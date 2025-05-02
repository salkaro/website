import React from 'react'
import Layout from '../layout/Layout'
import { Separator } from '../ui/separator';
import { HeadingNode } from './Page';
import Link from 'next/link';

interface AtlasLayoutProps {
    items: Record<string, {
        label: string
        link: string
    }[]>;
    headings: HeadingNode[];
    children: React.ReactNode;
    fragment: string;
    moduleType: string;
}



const AtlasLayout: React.FC<AtlasLayoutProps> = ({ items, headings, children, fragment, moduleType }) => {
    return (
        <Layout className='relative !p-0' footerClassName="!mt-0" isAtlasLayout>
            <div className='flex flex-grow min-h-full w-full '>
                {/* Sidebar */}
                <div className="hidden md:block overflow-y-auto w-64 xl:w-72 px-6 py-8 space-y-6 shrink-0 scrollbar-hide h-[calc(100vh-3.5rem)]">
                    {Object.entries(items).map(([level, topics]) => (
                        <div key={level}>
                            <h3 className="text-sm font-semibold mb-2 px-2">
                                {level}
                            </h3>
                            <div className="space-y-1">
                                {topics.map((item, idx) => {
                                    return (
                                        <Link
                                            key={idx}
                                            href={item.link}
                                            className={`${item.label.toLowerCase() === moduleType ? "bg-accent" : ""} block rounded-lg hover:bg-accent text-sm px-2 py-[6px]`}
                                        >
                                            <span>{item.label}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <Separator orientation="vertical" className="hidden md:block min-h-screen w-px border-l border-border border-dashed" />
                
                <div className='w-full flex flex-row'>
                    <div className='h-screen w-full overflow-y-auto scrollbar-hide'>
                        {children}
                    </div>

                    {/* Table of Contents */}
                    <div className='hidden md:block w-64 xl:w-72 mt-10'>
                        <h2 className='text-[14px] font-semibold mb-2'>On This Page</h2>
                        <TableOfContents headings={headings} fragment={fragment} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}


const TableOfContents = ({ headings, fragment }: { headings: HeadingNode[], fragment: string }) => {
    if (headings.length === 0) return null;

    const handleScrollToSection = (event: React.MouseEvent, targetId: string) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth',
            });
        }
    };

    return (
        <ul className="space-y-1 text-sm p-2">
            {headings.map((heading, idx) => {
                const fragmentValue = heading.text.toLowerCase().replaceAll(" ", "-");

                return (
                    <li key={idx}>
                        <a
                            href={`#${fragmentValue}`}
                            onClick={(event) => handleScrollToSection(event, fragmentValue)}
                            className={`${fragmentValue === fragment ? "text-white" : ""} block font-medium hover:text-white text-gray-400 transition duration-100`}
                        >
                            {heading.text}
                        </a>
                        {heading.children.length > 0 && (
                            <ul className="pl-2 space-y-2">
                                <TableOfContents headings={heading.children} fragment={fragment} />
                            </ul>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}


export default AtlasLayout;
