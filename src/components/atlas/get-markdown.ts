"use server"

import matter from 'gray-matter';

export async function getMarkdownContent(level: string, subject: string, moduleName: string): Promise<string> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/atlas/${level}/${subject}/${moduleName}.md`,
            { cache: 'no-store' }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.text();
        const { content } = matter(raw);
        return content;
    } catch (err) {
        console.error('Error reading markdown file:', err);
        return '# Error\nCould not load the requested content.';
    }
}
