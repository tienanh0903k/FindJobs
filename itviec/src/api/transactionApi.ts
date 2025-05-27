import { URL_BACKEND } from '@/constants';
import axiosClient from './axiosClient';

export const transactionApi = {
	getTransactionByMe: async () => {
		const response = await axiosClient.get(`${URL_BACKEND}/api/transaction/me`);
		return response;
	}, 

	createZaloPayOrder(amount: number, userId: string) {
		return axiosClient.post(`${URL_BACKEND}/api/payment/zalopay`, { amount, app_user: userId });
	},
};
