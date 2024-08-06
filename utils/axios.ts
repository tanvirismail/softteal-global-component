import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: process.env.API_HOST || '', withCredentials: true });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response) || 'Something went wrong')
);

export default axiosInstance;
