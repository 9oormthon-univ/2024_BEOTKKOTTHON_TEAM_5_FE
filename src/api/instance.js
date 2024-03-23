import axios from "axios";
import { baseURL } from "../constants/baseURL";

export const defaultInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

export const authInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

authInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
