import { LoginBodyType } from '@/app/types/auth.type';
import httpClient from './http';
import axiosClient from './axiosClient';
import axios, { AxiosResponse } from 'axios';

const URL_NEXT = 'http://localhost:3000'
const URL_BACKEND = 'http://localhost:3001'

interface AuthApi {
	login(body: LoginBodyType):Promise<AxiosResponse<any>>;
	loginClient(username: string, password: string): Promise<AxiosResponse<any>>;
	setCookie(token: string): Promise<Response>;
	logOut(): Promise<Response>;
	refreshToken(body: { refreshToken: string }): Promise<Response>;
  }


const authApi: AuthApi = {
	// ---POST: /auth/login--
	// login: (body: LoginBodyType) => httpClient.post('/auth/login', body),
	
	login: (body: LoginBodyType) => {
		return axiosClient.post(`${URL_BACKEND}/api/auth/login`, body)
	},

	// loginClient: async (username: string, password: string) => {
    //     return await httpClient.post(`/api/auth/login`, { username, password }, 
	// 		{ baseUrl: 'http://localhost:3000' },
	// 	);
    // },
	loginClient: async (username: string, password: string) => {
        return await axiosClient.post(`${URL_NEXT}/api/auth/login`, { username, password });
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


	refreshToken: (body) => httpClient.post('/auth/refresh-token', body),
};
export default authApi;
