import { URL_BACKEND } from "@/constants"
import axiosClient from "./axiosClient"


export const notifyApi = {
    getByIdUser: async (id: any) => {
        const response = await axiosClient.get(`${URL_BACKEND}/api/notify/${id}`)
        return  response.data
    }
}

