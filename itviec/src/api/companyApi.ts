import axiosClient from "./axiosClient"
const URL_BACKEND = 'http://localhost:3001'

const companyApi = {
    getAllCompany: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }): Promise<any> => {
        const response = await axiosClient.get(`${URL_BACKEND}/api/companies?page=${page}&limit=${limit}`)
        return response.data
    },        


    //get by id 
    getCompanyById: async (id: string): Promise<any> => {
        const response = await axiosClient.get(`${URL_BACKEND}/api/companies/${id}`)
        return response.data
    },

}
export default companyApi;
