import axios, { AxiosResponse } from "axios";
import { getTokenStorage } from "../hooks/use-token";

export const API_URL =
  "https://toko-ria-server-production.up.railway.app/api/v1";

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface CallApiProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  params?: any;
  data?: any;
}

export async function callApi<T = any>({
  url,
  method = "GET",
  params,
  data,
}: CallApiProps) {
  const token = getTokenStorage();
  return client({
    url,
    method,
    data,
    params,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })
    .then((value: AxiosResponse<T>) => value.data)
    .catch((error) => Promise.reject(error.response.data));
}

export async function uploadFile<T = any>({
  id,
  model,
}: {
  id: string;
  model: "users" | "categories" | "spare_parts";
}) {
  const token = getTokenStorage();
  return client({
    url: ["/file/upload" + model + id].join("/"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })
    .then((value: AxiosResponse<T>) => value.data)
    .catch((error) => Promise.reject(error.response.data));
}
