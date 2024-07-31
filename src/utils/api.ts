import axios, { AxiosResponse } from "axios";
import { getTokenStorage } from "../hooks/use-token";
import { FileWithPath } from "@mantine/dropzone";

/* Production */
export const BASE_URL = "https://api.riasigli.my.id"

/* Dev */
// export const BASE_URL = "http://localhost:8080";

export const API_URL = BASE_URL + "/api/v1";
export const PUBLIC_URL = BASE_URL + "/public";

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
  files
}: {
  id: string;
  model: "users" | "categories" | "spare_parts";
  files: FileWithPath[]
}) {
  const token = getTokenStorage();
  return client({
    url: [API_URL, "file/upload", model, id].join("/"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    data: files
  })
    .then((value: AxiosResponse<T>) => value.data)
    .catch((error) => Promise.reject(error.response.data));
}

export async function uploadUserPhoto<T = any>(files: FileWithPath[]) {
  const token = getTokenStorage();
  return client({
    url: [API_URL, "file/upload/me"].join("/"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    data: files
  })
    .then((value: AxiosResponse<T>) => value.data)
    .catch((error) => Promise.reject(error.response.data));
}