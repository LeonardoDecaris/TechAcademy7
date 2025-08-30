import axios, { InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error("Erro ao obter o token do AsyncStorage:", error);
    return config;
  }
});

export default api;