import axiosClient from "./axiosClient";
import { URL_BACKEND } from "@/constants";

export const reviewApi = {
    createReview: async (data: any) => {
        const response = await axiosClient.post(`${URL_BACKEND}/api/reviews`, data);
        return response.data;
    },

    getReviewStats: async (companyId: string) => {
        const response = await axiosClient.get(`${URL_BACKEND}/api/reviews/stats/${companyId}`);
        return response.data;
    },

    getReviews: async (companyId: string) => {
        const response = await axiosClient.get(`${URL_BACKEND}/api/reviews/${companyId}`);
        return response.data;
    }


}