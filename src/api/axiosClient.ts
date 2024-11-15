  import axios from 'axios';

  const axiosClient = axios.create({
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // Interceptors request
  axiosClient.interceptors.request.use(
    (config) => {
      // const expirationTime = localStorage.getItem('TokenExpiresAt');
      // const now = new Date().getTime();

      // if (expirationTime && now > parseInt(expirationTime, 10)) {
      //   localStorage.removeItem('TokenExpiresAt');
      //   localStorage.removeItem('user');
      //   window.location.href = '/login';
      //   return Promise.reject(new Error('Token expired'));
      // }

      if (typeof window !== 'undefined') {
        // Chỉ thêm token nếu đang chạy trên client-side
        const user = localStorage.getItem('user');
        if (user) {
          const token = JSON.parse(user).access_token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptors response
  axiosClient.interceptors.response.use(
      (response) => {
          return response;
      },
      (error) => {
          if (error.response) {
              if (error.response.status === 401) {
                  // Xử lý khi nhận được mã lỗi 401
                  console.error('Unauthorized request. Please login again.');
                  // Có thể xóa token nếu cần
                  // localStorage.removeItem('token');
              }
              console.error('Error response:', error.response);
          } else {
              console.error('Error message:', error.message);
          }
          return Promise.reject(error);
      }
  );

    

  export default axiosClient;
