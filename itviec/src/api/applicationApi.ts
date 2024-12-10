import { URL_BACKEND } from "@/constants";
import axiosClient from "./axiosClient";

export const applicationApi = {
    getAllApplication: async (data: {
        search?: string;
        status?: string;
    }) => {
        const res = await axiosClient.get(`${URL_BACKEND}/api/application`, { params: data });
        return res.data
    },
}