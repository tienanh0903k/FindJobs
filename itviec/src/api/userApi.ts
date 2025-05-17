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

	updateStatus: (id: string, status: number) =>
		axiosClient.patch(`${URL_BACKEND}/api/user/${id}/status`, { status }),

	updateUser: (id: string, data: any) => axiosClient.patch(`${URL_BACKEND}/api/user/${id}`, data),

	assignRole: (id: string, role: string) =>
		axiosClient.patch(`${URL_BACKEND}/api/user/${id}/role`, { role }),
};

export default userApi;