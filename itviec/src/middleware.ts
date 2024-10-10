import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken } from './lib/helper';
import createMiddleware from 'next-intl/middleware';


// const i18nMiddleware = createMiddleware({
// 	locales: ['en', 'vi'],  // Các ngôn ngữ hỗ trợ
// 	defaultLocale: 'vi',    // Ngôn ngữ mặc định
// });


const privatePaths: string[] = ['/profile', '/admin'];
const authPaths: string[] = ['/login', '/register'];

export async function middleware(request: NextRequest) {
	// const i18nResponse = i18nMiddleware(request);
	// if (i18nResponse) {
	// 	return i18nResponse;	
	// }

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
			return NextResponse.redirect(new URL('/profile', request.url));
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
	matcher: ['/login', '/register', '/profile', '/admin/:path*', '/:locale(en|vi)?/:path*'],
};
