
'use server';

import { cookies } from 'next/headers';

// export default async function setLanguageValue(value: string) {
//   cookies().set('language', value);
// }


export async function POST(request: Request) {
  try {
      const { value } = await request.json();

      cookies().set('language', value);

      return new Response(JSON.stringify({ message: 'Language set successfully' }), {
          status: 200,
      });
  } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to set language' }), {
          status: 500,
      });
  }
}