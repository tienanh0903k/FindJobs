import axiosClient from "./axiosClient"
import httpClient from "./http"

const URL_NEXT = 'http://localhost:3000'
const URL_BACKEND = 'http://localhost:3001'

const userApi = {
	getMe: async () => {
		const response = await axiosClient.get(`${URL_BACKEND}/api/user/me`);
		return response;
	},

	// getMe: () => httpClient.get(`${URL_BACKEND}/user/me`, {
	//     headers: {
	//        'Bearer'
	//     }
	// }),


	getBookmarks: async () => {
		const response = await axiosClient.get(`${URL_BACKEND}/api/user/bookmark`);
		return response;
	},

	create: (data: any) => {
		// return axiosClient.post(`${URL_BACKEND}/api/user`, data, {
		//     headers: {
		//         'Content-Type': 'multipart/form-data'
		//     }
		// })
		return axiosClient.post(`${URL_BACKEND}/api/user`, data);
	},

	//update user me
	updateMe: (data: any) => {
		return axiosClient.patch(`${URL_BACKEND}/api/user/me`, data);
	},

	getUsersByRoleId: async (roleId: string, status?: string) => {
		let url = `${URL_BACKEND}/api/user/by-role?roleId=${roleId}`;
		if (status !== undefined) {
			url += `&status=${status}`;
		}
		const response = await axiosClient.get(url);
		return response.data;
	},

	updateStatus: async(id: string, status: number) => {
		const response = await axiosClient.patch(`${URL_BACKEND}/api/user/${id}/status`, { status });
		return response.data;
	},

	updateUser: (id: string, data: any) => axiosClient.patch(`${URL_BACKEND}/api/user/${id}`, data),

	assignRole: (id: string, role: string) =>
		axiosClient.patch(`${URL_BACKEND}/api/user/${id}/role`, { role }),



	//====================== APPLICANT ======================
	getCandidates: async ({
		page = 1,
		limit = 10,
	}: {
		page?: number;
		limit?: number;
	}): Promise<any> => {
		const response = await axiosClient.get(
			`${URL_BACKEND}/api/user/applicant?page=${page}&limit=${limit}`,
		);
		return response.data;
	},




	//get balance
	getBalance: async (id: string) => {
		const response = await axiosClient.get(`${URL_BACKEND}/api/user/balance/${id}`);
		return response.data;
	},


	// bookmark bài viết
	bookmarkPost: async (postId: string): Promise<any> => {
		const response = await axiosClient.post(
			`${URL_BACKEND}/api/user/bookmark/${postId}`
		);
		return response.data;
	},

	// Xoá bookmark bài viết
	unBookmarkPost: async (postId: string): Promise<any> => {
		const response = await axiosClient.delete(
			`${URL_BACKEND}/api/user/bookmark/${postId}`
		);
		return response.data;
	},
};

export default userApi;