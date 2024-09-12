import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken } from './lib/helper';

const privatePaths: string[] = ['/profile', '/admin'];
const authPaths: string[] = ['/login', '/register'];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const sessionToken = request.cookies.get('sessionToken')?.value;
	//console.log('Token:', sessionToken);

	if (privatePaths.includes(pathname)) {
		if (!sessionToken) {
			return NextResponse.redirect(new URL('/login', request.url));
		}

		const decoded = await decodeToken(sessionToken);
		console.log('giai ma:', decoded);

		if (decoded?.role === 'ADMIN') {
			if (pathname === '/profile') {
				return NextResponse.next();
			}
			if (pathname !== '/admin') {
				return NextResponse.redirect(new URL('/admin', request.url));
			}
		} 
		
		else {
			if (pathname === '/admin') {
				return NextResponse.redirect(new URL('/profile', request.url));
			}
		}
	}

	if (authPaths.includes(pathname) && sessionToken) {
		return NextResponse.redirect(new URL('/profile', request.url));
	}

	return NextResponse.next(); 
}

export const config = {
	matcher: ['/login', '/register', '/profile', '/admin'], // Apply middleware to these paths
};
