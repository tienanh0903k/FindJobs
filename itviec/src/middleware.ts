import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken } from './lib/helper';

const privatePaths: string[] = ['/profile', '/admin']; 
const authPaths: string[] = ['/login', '/register']; 


// Middleware function
export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const sessionToken = request.cookies.get('sessionToken')?.value;
	//console.log('toekn:', sessionToken);

	if (privatePaths.some((path: string) => pathname.startsWith(path))) {
		if(!sessionToken) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
		
		const decoded = await decodeToken(sessionToken);

		if (decoded?.role === 'admin' && pathname !== '/admin') {
			return NextResponse.redirect(new URL('/admin', request.url));
		}

		if (decoded?.role !== 'admin' && pathname === '/admin') {
			return NextResponse.redirect(new URL('/profile', request.url));
		}

		
		
	}

	if (authPaths.some((path: string) => pathname.startsWith(path)) && sessionToken) {
		return NextResponse.redirect(new URL('/profile', request.url));
	}


	

	

	return NextResponse.next();
}

export const config = {
	matcher: ['/login', '/register', '/profile', '/admin'], // Định nghĩa các trang cần áp dụng middleware
};
