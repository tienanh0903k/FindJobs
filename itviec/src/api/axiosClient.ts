import axios from 'axios';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors request
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors response
axiosClient.interceptors.response.use(
	(response) => {
		// console.log('Response Data:', response.data); // Kiểm tra dữ liệu trả về
		return response;
	},
	(error) => {
		if (error.response) {
			console.error('Lỗi:', error.response); // Log lỗi từ server
		} else {
			console.error('Error Message:', error.message); // Log lỗi chung
		}
		return Promise.reject(error);
	},
);
  

export default axiosClient;
