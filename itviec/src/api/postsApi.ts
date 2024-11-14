import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';
import { IPost } from '@/app/types/interface';
const URL_BACKEND = 'http://localhost:3001';

interface IPostsApi {
	getMyPost(): Promise<AxiosResponse<any>>;
    getPostForHome: () => Promise<IPost[]>}

const postsApi: IPostsApi = {
	getMyPost: async () => {
		return await axiosClient.get(`${URL_BACKEND}/api/posts/me`, {
			withCredentials: true,
		});
	},

	getPostForHome: async (): Promise<IPost[]> => {
		const response = await axiosClient.get(`${URL_BACKEND}/api/posts/home`);
        return response.data
	},
};
export default postsApi;
