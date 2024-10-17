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
			if (error.response.status === 401) { 
			  localStorage.removeItem('user'); 
			}
			console.error('Lỗi:', error.response);		
		  } else {
			console.error('Error Message:', error.message);
		  }
		  return Promise.reject(error);
	},
);
  

export default axiosClient;
