import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import qs from "qs";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

export const api = axios.create({
  baseURL: apiUrl,
});

// export const fetcher = (key: string | [string, AxiosRequestConfig]) => {
//   const [url, config] = typeof key === "string" ? [key] : key;

//   if (config) {
//     config.paramsSerializer = (params: any) => {
//       return qs.stringify(params, { arrayFormat: "repeat" });
//     };
//   }

//   return api.get(url, config).then((res) => res.data);
// };
