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



import authApi from '@/api/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
const cookieStore = cookies();
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const result = await authApi.login({ username, password });
    const data = await result.json();
    console.log("Dữ liệu trả về:", data);

    if (!result.ok) {
      return NextResponse.json({ error: data.message || 'Login failed' }, { status: result.status });
    }

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
		maxAge: 10         
	  });
  
	
	  cookieStore.set('refreshToken', data.refresh_token, {
		path: '/',             
		httpOnly: true,       
		sameSite: 'strict',   
		maxAge: 86400            
	  });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
