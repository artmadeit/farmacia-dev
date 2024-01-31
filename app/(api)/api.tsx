import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { format } from "date-fns";
import { handleDates } from "../date";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

export const useAuthApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  return () =>
    getAccessTokenSilently().then((accessToken) => {
      const api = axios.create({
        baseURL: apiUrl,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      api.interceptors.request.use((config) => {
        handleDatesRequest(config.data);
        return config;
      });

      api.interceptors.response.use((originalResponse) => {
        handleDates(originalResponse.data);
        return originalResponse;
      });

      return api;
    });
};

/**
 * For localdatetime support
 */
function handleDatesRequest(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (body[key] instanceof Date)
      body[key] = format(body[key], "yyyy-MM-dd'T'HH:mm:ss'Z'");
    else if (typeof value === "object") handleDatesRequest(value);
  }
}
