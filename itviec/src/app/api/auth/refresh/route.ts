// app/api/auth/refresh/route.ts
import authApi from '@/api/authApi';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Lấy refresh token từ cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'Missing refresh token' }, { status: 400 });
    }

    const result = await authApi.refreshToken({ refreshToken });
    const data = await result.json();
    console.log('data:----', data);

    if (!result.ok) {
      return NextResponse.json({ error: data.message || 'Refresh token failed' }, { status: result.status });
    }

    // Set cookie chứa access_token mới và refresh_token mới (nếu có)
    const accessTokenCookie = `sessionToken=${data.access_token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`;
    const refreshTokenCookie = `refreshToken=${data.refresh_token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;

    const response = NextResponse.json(data);
    response.headers.set('Set-Cookie', accessTokenCookie);
    response.headers.set('Set-Cookie', refreshTokenCookie);

    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
