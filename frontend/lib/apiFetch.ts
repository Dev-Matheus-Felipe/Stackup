"server-only";

import { getToken } from "./token";

const API_URL = process.env.API_URL;
const API_PORT = process.env.API_PORT;

export default async function apiFetch<T>({
  endpoint,
  options,
  cache,

}: {
  endpoint: string,
  options: RequestInit,
  cache?: boolean,

}): Promise<T> {

  const token = await getToken();

  const full_endpoint = `http://${API_URL}:${API_PORT}${endpoint}`;

  const headers = {
    "Content-Type": "application-json",
    ...(token && {"Authorization" : `Bearer ${token}`}),
    ...(options.headers && {...options.headers} as Record<string, string>)
  }

  const res = await fetch(full_endpoint, { 
    ...options,
    headers, 
    cache: (cache ? "force-cache" : "no-cache")  
  });

  return (await res.json());
}
