// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
// 	const res = await request.json();
// 	const sessionToken = res.token;
// 	if (!sessionToken) {
// 		return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
// 	}
// 	//set cookie
// 	//console.log("Server:-->", res);
// 	 // Tạo cookie
// 	 const cookie = `sessionToken=${sessionToken}; Path=/; HttpOnly; SameSite=Strict`;

// 	 const response = NextResponse.json({ message: 'Token set in cookie' });
// 	 response.headers.set('Set-Cookie', cookie);
// 	 return response;
// 	//return Response.json(res);
// }

// import authApi from '@/api/auth';
import authApi from '@/api/authApi';
import { getErrorMessage } from '@/lib/helper';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const cookieStore = cookies();
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
		}

		const res = await authApi.login({ username, password });
		const data = res.data;
		console.log('Dữ liệu trả về:', data);
		// Dữ liệu trả về: {
		//   access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpZW5hbmhAZ21haWwuY29tIiwic3ViIjoiNjZjOWZiOTZkYTEzMjJmOTVkMzI4ODVmIiwiaWF0IjoxNzI1ODUyOTA3LCJleHAiOjE3MjU4NTY1MDd9.SjkMrGM50iw8W9qceG9SiEE48OG4GFGpbsL83uUkIwE',
		//   refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpZW5hbmhAZ21haWwuY29tIiwic3ViIjoiNjZjOWZiOTZkYTEzMjJmOTVkMzI4ODVmIiwiaWF0IjoxNzI1ODUyOTA3LCJleHAiOjE3MjYwMjU3MDd9.2u9BUuP8aZh0GuVhh10A8FncVuXyZQ5ypArDjfIa9Wc',
		//   user: { _id: '66c9fb96da1322f95d32885f', name: 'tien anh' }
		// }
		// ReferenceError: data is not defined

		// if (!res.ok) {
		//   return NextResponse.json({ error: data.message || 'Login failed' }, { status: result.status });
		// }

		// const accessTokenCookie = `sessionToken=${data.access_token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;

		const response = NextResponse.json(data);

		// response.headers.set('Set-Cookie', accessTokenCookie);

		// response.cookies.set('refreshToken', data.refresh_token, {
		//   path: '/',           // Đảm bảo rằng path được set chính xác
		//   httpOnly: true,      // Đảm bảo cookie không thể truy cập từ JavaScript
		//   sameSite: 'strict',  // Cài đặt chế độ sameSite cho bảo mật
		//   maxAge: 5000,          // Thời gian sống của refresh_token là 10 giây
		// });
		cookieStore.set('sessionToken', data.access_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 3600,
		});

		cookieStore.set('refreshToken', data.refresh_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 86400,
		});

		return response;
	} catch (error) {
		console.error("---error", error);
		return NextResponse.json({ error });
	}
}
