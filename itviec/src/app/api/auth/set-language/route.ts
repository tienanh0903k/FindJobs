'use server';

import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
      const { value } = await request.json();
      cookies().set('language', value, { path: '/', httpOnly: false }); // Thêm path: '/' và httpOnly: false để client có thể đọc
      return new Response(JSON.stringify({ message: 'Language set successfully' }), {
          status: 200,
      });
  } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to set language' }), {
          status: 500,
      });
  }
}
