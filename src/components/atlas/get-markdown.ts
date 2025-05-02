"use server"

import path from 'path';
import matter from 'gray-matter';
import { promises } from 'fs';

export async function getMarkdownContent(level: string, subject: string, moduleName: string): Promise<string> {
    try {
        // Path to markdown file
        const filePath = path.join(process.cwd(), 'content', 'atlas', level, subject, `${moduleName}.md`);

        // Read the file content
        const fileContent = await promises.readFile(filePath, 'utf8');

        // Parse front matter if needed
        const { content } = matter(fileContent);


        return content;
    } catch (error) {
        console.error('Error reading markdown file:', error);
        return '# Error\nCould not load the requested content.';
    }
}
