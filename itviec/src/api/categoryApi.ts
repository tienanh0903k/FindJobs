import { URL_BACKEND } from "@/constants";
import axiosClient from "./axiosClient";

const categoryApi = {
    getAllCategories: async () => {
        const response = await axiosClient.get(`${URL_BACKEND}/api/category`);
        return response;
    }
}

export default categoryApi;

	