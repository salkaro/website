import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const ref = url.searchParams.get('ref'); 

    if (ref) {
        url.pathname = '/copy-text';
        url.searchParams.delete('ref'); 
        url.searchParams.append('p', ref)
        return NextResponse.redirect(url);
    }

    // Allow other requests to proceed as normal
    return NextResponse.next();
}

export const config = {
    matcher: '/:path*', // Match all paths
};
