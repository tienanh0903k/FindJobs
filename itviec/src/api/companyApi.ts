import axiosClient from "./axiosClient"
const URL_BACKEND = 'http://localhost:3001'

const companyApi = {
	// getAllCompany: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }): Promise<any> => {
	//     const response = await axiosClient.get(`${URL_BACKEND}/api/companies?page=${page}&limit=${limit}`)
	//     return response.data
	// },

	getHomeCompanies: async (limit = 8): Promise<any> => {
		const response = await axiosClient.get(`${URL_BACKEND}/api/companies/home?limit=${limit}`);
		return response.data;
	},

	getAllCompanySelect: async (): Promise<any> => {
		const response = await axiosClient.get(`${URL_BACKEND}/api/companies`);
		return response.data;
	},

	getAllCompany: async ({
		page = 1,
		limit = 10,
		status = 1, // mặc định lấy status 1
	}: {
		page?: number;
		limit?: number;
		status?: number;
	}): Promise<any> => {
		const response = await axiosClient.get(
			`${URL_BACKEND}/api/companies?page=${page}&limit=${limit}&status=${status}`,
		);
		return response.data;
	},

	//get by id
	getCompanyById: async (id: string): Promise<any> => {
		const response = await axiosClient.get(`${URL_BACKEND}/api/companies/${id}`);
		return response.data;
	},

	//create company
	createCompany: async (data: any): Promise<any> => {
		const response = await axiosClient.post(`${URL_BACKEND}/api/companies`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	},

	//update company
	updateCompany: async (id: string, data: any): Promise<any> => {
		try {
			const response = await axiosClient.patch(`${URL_BACKEND}/api/companies/${id}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return response.data;
		} catch (error) {
			console.error('Error updating company:', error);
			throw error;
		}
	},

	//delete company
	deleteCompany: async (id: string): Promise<any> => {
		const response = await axiosClient.delete(`${URL_BACKEND}/api/companies/${id}`);
		return response.data;
	},
};
export default companyApi;
