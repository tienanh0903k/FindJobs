import axiosClient from './axiosClient';
import { URL_BACKEND } from '@/constants';

export const profileApi = {
	// Post project vào user profile
	postProject: (userId: string, data: any) => {
		return axiosClient.post(`${URL_BACKEND}/api/user/${userId}/projects`, data);
	},
	deleteArrayItem: async (userId: string, arrayField: string, itemId: string) => {
		return axiosClient.delete(`${URL_BACKEND}/api/user/${userId}/${arrayField}/${itemId}`);
	},

	uploadAvatar: (userId: string, file: File) => {
		const formData = new FormData();
		formData.append('file', file);

		return axiosClient.post(`${URL_BACKEND}/api/user/avatar/${userId}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},
};
