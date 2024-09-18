import axiosClient from "./axiosClient";

const URL_NEXT = 'http://localhost:3000'
const URL_BACKEND = 'http://localhost:3001'

const roleApi = {
    //get role by id
    getRoleById: (id: string) => axiosClient.get(`${URL_BACKEND}/roles/${id}`),

    getRoles: () => axiosClient.get(`${URL_BACKEND}/roles`),

    getPermission: () => axiosClient.get(`${URL_BACKEND}/permissions`),
}
export default roleApi;