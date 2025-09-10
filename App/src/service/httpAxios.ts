import axios, { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL as ENV_BASE_URL } from '@env';

const defaultURL = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
  default: 'http://localhost:3000'
}) as string;


const envUrl = (ENV_BASE_URL || '').trim();
export const baseURL = envUrl || defaultURL;

let authTokenCache: string | null = null;
let tokenLoaded = false;

export const setAuthToken = async (token: string | null) => {
  authTokenCache = token;
  if (token) {
    await AsyncStorage.setItem('authToken', token);
  } else {
    await AsyncStorage.removeItem('authToken');
  }
};

export const clearAuthToken = () => setAuthToken(null);

const http = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    Accept: 'application/json'
  }
});

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      if (!tokenLoaded || authTokenCache === null) {
        authTokenCache = (await AsyncStorage.getItem('authToken')) || null;
        tokenLoaded = true;
      }
      if (authTokenCache) {
        config.headers.Authorization = `Bearer ${authTokenCache}`;
      }
      (config.headers as any)['X-Request-Id'] = `${Date.now()}-${Math.random()
        .toString(16)
        .slice(2)}`;
    } catch {
    }
    return config;
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);


export default http;