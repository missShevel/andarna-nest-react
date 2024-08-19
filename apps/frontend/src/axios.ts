import axios from 'axios';
import { auth } from './firebase';
console.log(process.env.NX_PUBLIC_API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: process.env.NX_PUBLIC_API_BASE_URL,
});

const axiosInstanceAuthorized = axios.create({
  baseURL: process.env.NX_PUBLIC_API_BASE_URL,
});

axiosInstanceAuthorized.interceptors.request.use(
  async (config) => {
    const firebaseUser = auth.currentUser;

    if (firebaseUser) {
      const AUTH_TOKEN = await firebaseUser.getIdToken();
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstanceAuthorized, axiosInstance };
