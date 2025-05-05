import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';
import { IPost } from '@/app/types/interface';
import { URL_BACKEND } from '@/constants';

interface IPostsApi {
	getMyPost(): Promise<AxiosResponse<any>>;
    getPostForHome: () => Promise<IPost[]>;
	getPostById: (id: string) => Promise<IPost>;
	createPost: (data: any) => Promise<IPost>;
	searchPosts: (query: string) => Promise<IPost[]>; 
}

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

	getPostById: async (id: string) => {
		const response = await axiosClient.get(`${URL_BACKEND}/api/posts/${id}`);
		return response.data
	},


	//create post 
	createPost : async (data: any) => {
		const response = await axiosClient.post(`${URL_BACKEND}/api/posts`, data);
		return response.data
	},

	searchPosts: async (query: string): Promise<IPost[]> => {
        const response = await axiosClient.post(
            `${URL_BACKEND}/api/posts/search?query=${(query)}`
        );
        return response.data;
    },
};
export default postsApi;
