import axios, { InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from '@env';
import { Platform } from "react-native";

const defaultURL = Platform.select({
  android: 'http://10.0.2.2:3000',
  ios: 'http://localhost:3000',
  default: 'http://localhost:3000',
});
const baseURL = (BASE_URL || '').trim() || (defaultURL as string);
console.log('[ApiAxios] BASE_URL=', BASE_URL, '-> usando:', baseURL);

const api = axios.create({ baseURL });

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  } catch {
    return config;
  }
});

export default api;