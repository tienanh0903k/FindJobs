import axiosClient from "./axiosClient"

const URL_NEXT = 'http://localhost:3000'
const URL_BACKEND = 'http://localhost:3001'

const userApi = {
    getMe: () => axiosClient.get(`${URL_BACKEND}/api/user/me`),
    create: (data: any) => {
        return axiosClient.post(`${URL_BACKEND}/api/user`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default userApi;