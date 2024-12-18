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


    changeStatus: async (data: any) => {
        // data body 
        // {
        //     "id": "67564659478a761263b70ec7",
        //     "status": "reviewing"
        // }
        //candidate minh thuan
        const res = await axiosClient.put(`${URL_BACKEND}/api/application`, data);
        return res.data
    },



    //send mailer
    sendMail: async (data: any) => {
        const res = await axiosClient.post(`${URL_BACKEND}/api/mail/send`, data);
        return res.data
    }
}