import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import qs from "qs";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

export const api = axios.create({
  baseURL: apiUrl,
});
