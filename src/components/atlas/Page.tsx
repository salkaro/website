"use client"

// Local Imports
import { basic } from '@/app/atlas/basic';
import { Button } from '../ui/button';
import AtlasLayout from '@/components/atlas/AtlasLayout';
import { standard } from '@/app/atlas/standard';
import { getMarkdownContent } from './get-markdown';

// External Imports
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import rehypeStringify from 'rehype-stringify'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'


// Styles
import 'github-markdown-css';
import 'katex/dist/katex.min.css'

// Define a type for navigation items
export type NavItem = {
    label: string;
    link: string;
};

export type HeadingNode = {
    text: string;
    level: number;
    children: HeadingNode[];
};

export type NavSection = {
    [sectionName: string]: NavItem[];
};

export type LevelData = {
    [subject: string]: NavSection;
};

// Define a mapping for all levels
const levelData: Record<string, LevelData> = {
    basic: basic,
    standard: standard,
};


const getPreviousAndNextModule = (
    level: string,
    subject: string,
    moduleType: string
) => {
    const currentLevelData = levelData[level] || {};

    // Ensure that currentLevelData[subject] is a NavSection (an object with NavItem[] values)
    const modules = Object.values(currentLevelData[subject] || {}).flat();

    // Find the index of the current moduleType
    const currentIndex = modules.findIndex((module) => module.link === moduleType);

    // Get the previous and next modules, if they exist
    const previousModule = modules[currentIndex - 1] || null;
    const nextModule = modules[currentIndex + 1] || null;

    return { previousModule, nextModule };
};

const Page = () => {
    const router = useRouter()

    const [tocHierarchy, setTocHierarchy] = useState<HeadingNode[]>([] as HeadingNode[]);
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [fragment, setFragment] = useState<string>('');

    // Use `useRouter` to get the dynamic route parameters
    const params = useParams();
    const { level, subject, moduleType } = params as { level: string; subject: string; moduleType: string; };

    // Get the navigation items based on the level and subject
    const currentLevelData = levelData[level] || {};
    const items = currentLevelData[subject] || {};

    // Get previous and next modules
    const { previousModule, nextModule } = getPreviousAndNextModule(level, subject, moduleType);


    useEffect(() => {
        const handleHashChange = () => {
            const fragmentFromUrl = window.location.hash.slice(1);  // Get fragment after #
            setFragment(fragmentFromUrl); // Update state with the new fragment
        };

        // Initial check and then on hash change
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Use useEffect to fetch and process markdown content
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const markdown = await getMarkdownContent(level, subject, moduleType);

                // Extract headings for TOC
                const minLevel = 2;
                const headings = extractHeadings(markdown, minLevel);
                const toc = buildHeadingHierarchy(headings, minLevel);
                setTocHierarchy(toc);

                // Convert markdown to HTML
                const file = await unified()
                    .use(remarkParse) 
                    .use(remarkGfm)       // GitHub Flavored Markdown (tables, task lists, etc.)
                    .use(remarkMath)      // parse $…$ and $$…$$
                    .use(remarkRehype)    // turn the remark AST into a rehype AST
                    .use(rehypeKatex)     // render math nodes to HTML with KaTeX
                    .use(rehypeStringify) // serialize back to a HTML string
                    .process(markdown)

                const htmlWithIds = addIdsToHeadings(String(file));
                setHtmlContent(htmlWithIds);
            } catch (error) {
                console.error('Error fetching or processing markdown:', error);
            }
        };

        fetchContent();
    }, [level, subject, moduleType]);

    return (
        <AtlasLayout items={items} headings={tocHierarchy} fragment={fragment} moduleType={moduleType}>
            <div className="flex flex-col gap-6 ">
                {/* Content */}
                <article className="markdown-body px-6 md:px-12 xl:px-24" style={{ backgroundColor: 'transparent' }}>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </article>
            </div>

            {/* Previous and Next buttons */}
            <div className="flex mx-4 md:mx-12 xl:mx-24 mt-12 mb-24">
                {previousModule && (
                    <div className='w-full flex justify-start'>
                        <Button
                            variant="ghost"
                            onClick={() => router.push(`/atlas/${level}/${subject}/${previousModule.link}`)}
                        >
                            <span><ChevronLeft /></span>
                            <span>{previousModule.label}</span>
                        </Button>
                    </div>

                )}
                {nextModule && (
                    <div className='w-full flex justify-end'>
                        <Button
                            variant="ghost"
                            onClick={() => router.push(`/atlas//${level}/${subject}/${nextModule.link}`)}
                        >
                            <span>{nextModule.label}</span>
                            <span><ChevronRight /></span>
                        </Button>
                    </div>

                )}
            </div>
        </AtlasLayout >
    );
};


const addIdsToHeadings = (html: string) => {
    return html.replace(/<h([2-6])>([^<]+)<\/h\1>/g, (match, level, text) => {
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''); // Clean and generate ID
        return `<h${level} id="${id}">${text}</h${level}>`;
    });
};


function extractHeadings(markdown: string, minLevel: number): { level: number; text: string; }[] {
    const headingRegex = new RegExp(`^(#{${minLevel},6})\\s+(.+)`, 'gm');
    const headings: { level: number; text: string; }[] = [];

    let match;
    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();

        headings.push({ level, text });
    }

    return headings;
}

function buildHeadingHierarchy(headings: { level: number; text: string; }[], minLevel: number): HeadingNode[] {
    const result: HeadingNode[] = [];
    const stack: HeadingNode[] = [];

    headings.forEach(heading => {
        // Skip headings with level < minLevel (h1 if minLevel is 2)
        if (heading.level < minLevel) return;

        const node: HeadingNode = {
            text: heading.text,
            level: heading.level,
            children: []
        };

        // Find the correct parent for this heading
        while (
            stack.length > 0 &&
            stack[stack.length - 1].level >= heading.level
        ) {
            stack.pop();
        }

        if (stack.length === 0) {
            result.push(node);
        } else {
            stack[stack.length - 1].children.push(node);
        }

        stack.push(node);
    });

    return result;
}


export default Page