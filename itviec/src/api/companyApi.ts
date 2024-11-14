import axiosClient from "./axiosClient"
const URL_BACKEND = 'http://localhost:3001'

const companyApi = {
    getAllCompany: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
        return axiosClient.get(`${URL_BACKEND}/api/companies?page=${page}&limit=${limit}`)
    }        


}
export default companyApi;
