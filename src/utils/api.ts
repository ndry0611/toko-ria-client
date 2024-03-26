import { getTokenStorage } from "../hooks/use-token";

export const API_URL = "http://localhost:8080/api/v1";

export async function callApi({
  url,
  method = "GET",
  body,
}: {
  url: string;
  method?: string;
  body?: any;
}) {
  const result = await fetch(API_URL + url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: (getTokenStorage()
        ? `Bearer ${getTokenStorage()}`
        : undefined) as any,
    },
    body: JSON.stringify(body),
  });
  return result;
}
