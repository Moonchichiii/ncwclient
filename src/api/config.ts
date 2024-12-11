import axios, { AxiosInstance } from 'axios';

export const BASE_URL = (import.meta.env.VITE_API_URL as string ) || 'http://localhost:8000/api';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});