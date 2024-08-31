import { LoginBodyType } from '@/app/types/auth.type';
import httpClient from './http';
interface AuthApi {
	login(body: LoginBodyType): Promise<Response>;
	setCookie(token: string): Promise<Response>;
}
const authApi: AuthApi = {
	login: (body: LoginBodyType) => httpClient.post('/auth/login', body),
	setCookie: async (token: string) => {
		return await httpClient.post(
			'/api/auth',
			{ token },
			{ baseUrl: 'http://localhost:3000' },
		);
		// try {
		// 	const response = await fetch('http://localhost:3000/api/auth', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify({ token }),
		// 	});
		// 	if (!response.ok) {
		// 		const errorText = await response.text();
		// 		throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
		// 	}
		// } catch (error) {
		// 	console.error('Set cookie error:', error);
		// 	throw error;
		// }
	},
};
export default authApi;
