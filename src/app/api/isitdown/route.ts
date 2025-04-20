// File: app/api/isitdown/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Parse the URL search params to extract the 'url' parameter.
    const { searchParams } = new URL(request.url);
    const inputUrl = searchParams.get('url');

    // If no URL is provided, return a 400 error.
    if (!inputUrl) {
        return NextResponse.json(
            { error: 'No URL provided. Please include a URL query parameter.' },
            { status: 400 }
        );
    }

    // Ensure the URL has a scheme. If not, prepend "https://"
    let formattedUrl = inputUrl;
    if (!/^https?:\/\//i.test(inputUrl)) {
        formattedUrl = `https://${inputUrl}`;
    }

    try {
        // Use a HEAD request for a quick check.
        const response = await fetch(formattedUrl, {
            method: "HEAD",
            // this tells Next’s fetch not to cache nor re‑use
            cache: "no-store",
            // follow redirects (optional but often helpful)
            redirect: "follow",
        });

        // If the fetch is successful and the status is OK, the site is up.
        if (response.ok) {
            return NextResponse.json({ down: false, status: response.status });
        } else {
            return NextResponse.json({ down: true, status: response.status });
        }
    } catch (error) {
        // If an error is thrown, assume the site is down.
        return NextResponse.json({ down: true, error: error });
    }
}
