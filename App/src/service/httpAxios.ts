import axios, { InternalAxiosRequestConfig } from "axios";

import { BASE_URL } from '@env';
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultURL = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
  default: 'http://localhost:3000',
});

const baseURL = (BASE_URL || '').trim() || (defaultURL as string);

const http = axios.create({ baseURL });

http.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  } catch {
    return config;
  }
});

export default http;