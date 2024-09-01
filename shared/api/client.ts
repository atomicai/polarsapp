import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken } from '../services/auth';

export const API_BASE_URL = 'https://polaroids.ngrok.app/';
const clientWithAuth = axios.create({ baseURL: API_BASE_URL });
const clientDefault = axios.create({ baseURL: API_BASE_URL });

clientWithAuth.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('session');

  if (config.headers && token) {
    const accessToken: string = JSON.parse(token).access_token;
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

// clientWithAuth.interceptors.response.use(
//   async function (response) {
//     return response;
//   },
//   async function (error: AxiosError) {
//     const originalRequest = error.config;
//     if (!originalRequest) return error;
//     if (error.response?.status === 401) {
//       const token = await AsyncStorage.getItem('session');
//       // @ts-ignore
//       if (originalRequest._retry) return error;
//       if (!token) return error;
//       // @ts-ignore
//       originalRequest._retry = true;

//       try {
//         const refresh_token: string = JSON.parse(token).refresh_token;
//         const response = await refreshAccessToken({ refresh_token });
//         console.log(response);
//       } catch (e) {
//         throw e;
//       }

//       return clientWithAuth(originalRequest);
//     }
//     throw error;
//   }
// );

export { clientDefault, clientWithAuth };
