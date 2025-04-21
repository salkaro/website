import dns from 'node:dns/promises'; 
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
    let hostname = inputUrl;
    if (!/^https?:\/\//i.test(inputUrl)) {
        hostname = `https://${inputUrl}`;
    }
    const parsed = new URL(hostname);

    try {
        const ips = await dns.lookup(parsed.hostname);
        // Use a HEAD request for a quick check.
        const response = await fetch(hostname, {
            method: "HEAD",
            // this tells Next’s fetch not to cache nor re‑use
            cache: "no-store",
            // follow redirects (optional but often helpful)
            redirect: "follow",
        });
        console.log(ips)

        // If the fetch is successful and the status is OK, the site is up.
        if (response.ok) {
            return NextResponse.json({ down: false, status: response.status, ip: ips, });
        } else {
            return NextResponse.json({ down: true, status: response.status, ip: ips, });
        }
    } catch (error) {
        console.error(error)
        // If an error is thrown, assume the site is down.
        return NextResponse.json({ down: true, error: error });
    }
}
