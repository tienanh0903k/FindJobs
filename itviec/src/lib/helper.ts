import { jwtVerify, JWTVerifyResult } from 'jose';

export async function decodeToken(token: string) {
	const SECRET_KEY = process.env.SECRET_KEY || 'NTASPORT';

	try {   
		const key = new TextEncoder().encode(SECRET_KEY);
		const { payload }: JWTVerifyResult = await jwtVerify(token, key);

		return payload;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function formatDate(date: any, locale = 'en-US', options: any) {
	return new Date(date).toLocaleDateString(locale, options);
}
