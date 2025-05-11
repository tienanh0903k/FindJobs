import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken } from './lib/helper';

const privatePaths: string[] = ['/profile', '/admin', '/message'];
const authPaths: string[] = ['/login', '/register'];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const sessionToken = request.cookies.get('sessionToken')?.value;
	//console.log('Token:', sessionToken);
	const isAdminPath = pathname.startsWith('/admin');
	if (privatePaths.some((path) => pathname.startsWith(path))) {
		if (!sessionToken) {
			return NextResponse.redirect(new URL('/login', request.url));
		}

		const decoded = await decodeToken(sessionToken);

		if (decoded?.role === 'ADMIN' || decoded?.role === 'HR') {
			if (isAdminPath || pathname === '/profile') {
				return NextResponse.next();
			}
			//return NextResponse.redirect(new URL('/profile', request.url));
		} else {
			if (isAdminPath) {
				return NextResponse.redirect(new URL('/profile', request.url));
			}
		}
	}

	if (authPaths.includes(pathname) && sessionToken) {
		const decoded = await decodeToken(sessionToken);

		if (decoded?.role === 'USER') {
			return NextResponse.redirect(new URL('/', request.url));
		}
		return NextResponse.redirect(new URL('/profile', request.url));
	}

	return NextResponse.next();
}
export const config = {
	matcher: [
		'/login',
		'/register',
		'/profile',
		'/admin/:path*',
		'/message/:path*',
		// '/:locale(en|vi)?/:path*',
		'/((?!api|_next|static|favicon.ico).*)',
	],
};
