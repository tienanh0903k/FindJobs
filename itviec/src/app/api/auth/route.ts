import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const res = await request.json();
	const sessionToken = res.token;
	if (!sessionToken) {
		return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
	}
	//set cookie
	//console.log("Server:-->", res);
	 // Tạo cookie
	 const cookie = `sessionToken=${sessionToken}; Path=/; HttpOnly; SameSite=Strict`;

	 const response = NextResponse.json({ message: 'Token set in cookie' });
	 response.headers.set('Set-Cookie', cookie);
	 return response;
	//return Response.json(res);
}
