import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { subject: string } }) {
    const subjectParams = await params;
    const subject = await subjectParams.subject; 

    const basePath = path.join(process.cwd(), 'public', 'study-material', subject);

    // Check if the subject folder exists
    if (!fs.existsSync(basePath)) {
        return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    // Read the topics (subfolders)
    const topics = fs
        .readdirSync(basePath)
        .filter((file) => fs.statSync(path.join(basePath, file)).isDirectory());

    // Map each topic to its PDFs
    const material = topics.map((topic) => {
        const topicPath = path.join(basePath, topic);
        const pdfs = fs
            .readdirSync(topicPath)
            .filter((file) => file.endsWith('.pdf'));

        return { topic, pdfs };
    });

    // Return the JSON response
    return NextResponse.json(material);
}
