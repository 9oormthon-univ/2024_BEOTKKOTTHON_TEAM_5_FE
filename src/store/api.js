import axios from 'axios'

const BASE_URL = 'https://api.dis-tance.com'
const getToken = localStorage.getItem('token');

const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options })
  return instance
}

const axiosAuthApi = (url, options) => {
  const token = getToken;
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: token },
    ...options,
  })
  return instance
}

export const defaultInstance = axiosApi(BASE_URL)
export const authInstance = axiosAuthApi(BASE_URL)