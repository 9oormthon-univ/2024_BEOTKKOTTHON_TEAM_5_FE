import axios from "axios";
import { baseURL } from "../constants/baseURL";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options, timeout: 5000 });
  return instance;
};

const axiosAuthApi = (url, options) => {
  const instance = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: { Authorization: token },
    ...options,
  });
  return instance;
};

export const defaultInstance = axiosApi(baseURL);
export const authInstance = axiosAuthApi(baseURL);
