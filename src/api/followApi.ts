import { URL_BACKEND } from "@/constants";
import axiosClient from "./axiosClient";

export const followApi = {
	follow: async (data: { companyId: string; userId: string }) => {
		const response = await axiosClient.post(`${URL_BACKEND}/api/follower/`, data);
		return response.data;
	  },
	


	isFollow: async ({ companyId, userId }: { companyId: string; userId: string }) => {
	  if (!companyId || !userId) {
		throw new Error('CompanyId và UserId phải được truyền vào');
	  }
	  const response = await axiosClient.get(`${URL_BACKEND}/api/follower/${companyId}/${userId}`);
	  return response.data;
	},


	unFollow: async (data: { companyId: string; userId: string }) => {
		const response = await axiosClient.delete(`${URL_BACKEND}/api/follower/`, {
			data: data,
		});
		return response.data;
	}
  };