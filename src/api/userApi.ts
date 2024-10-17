import axiosClient from "./axiosClient"
import httpClient from "./http"

const URL_NEXT = 'http://localhost:3000'
const URL_BACKEND = 'http://localhost:3001'

const userApi = {
    // getMe: () => axiosClient.get(`${URL_BACKEND}/api/user/me`),

    // getMe: () => httpClient.get(`${URL_BACKEND}/user/me`, {
    //     headers: {
    //        'Bearer'
    //     }
    // }),

    create: (data: any) => {
        return axiosClient.post(`${URL_BACKEND}/api/user`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default userApi;