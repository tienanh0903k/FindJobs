import axiosClient from "./axiosClient";

const URL_NEXT = 'http://localhost:3000'
const URL_BACKEND = 'http://localhost:3001'

const roleApi = {
    //get role by id
    getRoleById: (id: string) => axiosClient.get(`${URL_BACKEND}/api/roles/${id}`),

    getRoleForAdmin: (id: string) => axiosClient.get(`${URL_BACKEND}/api/roles/${id}/permissions`),  

    getRoles: () => axiosClient.get(`${URL_BACKEND}/api/roles`),

    getPermission: () => axiosClient.get(`${URL_BACKEND}/api/permissions`),
}
export default roleApi;