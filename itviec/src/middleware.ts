// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const privatePaths = ['/me'];
// const authPaths = ['/login', '/register'];
// export function middleware(request: NextRequest) {
// 	return NextResponse.redirect(new URL('/home', request.url));
// }


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 

export const config = {
  matcher: '/about/:path*',
}