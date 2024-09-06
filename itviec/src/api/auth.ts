import { LoginBodyType } from '@/app/types/auth.type';
import httpClient from './http';

interface AuthApi {
	login(body: LoginBodyType): Promise<Response>;
	loginClient(username: string, password: string): Promise<Response>;
	setCookie(token: string): Promise<Response>;
	logOut(): Promise<Response>;
  }


const authApi: AuthApi = {
	// ---POST: /auth/login--
	login: (body: LoginBodyType) => httpClient.post('/auth/login', body),

	loginClient: async (username: string, password: string) => {
        return await httpClient.post(`/api/auth/login`, { username, password }, 
			{ baseUrl: 'http://localhost:3000' },
		);
    },

	// ---POST: /auth/login--
	setCookie: async (token: string) => {
		return await httpClient.post(
			'/api/auth/login',
			{ token },
			{ baseUrl: 'http://localhost:3000' },
		);
	},
	// ---POST: /api/auth/logout--
	logOut: async () => {
		return await httpClient.post(
			'/api/auth/logout',
			{},
			{ baseUrl: 'http://localhost:3000' }
		);
	},
};
export default authApi;
