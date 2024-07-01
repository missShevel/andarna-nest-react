import axios from 'axios';
console.log(process.env.NX_PUBLIC_API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: process.env.NX_PUBLIC_API_BASE_URL,
});

export default axiosInstance;
