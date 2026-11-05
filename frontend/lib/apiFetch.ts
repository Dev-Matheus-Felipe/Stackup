"server-only";

const API_URL = process.env.API_URL;
const API_PORT = process.env.API_PORT;

export default async function apiFetch<T>({
  endpoint,
  options,
  token,

}: {
  endpoint: string,
  options: RequestInit,
  token: string | null,

}): Promise<Response> {
  const full_endpoint = `http://${API_URL}:${API_PORT}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...(token && {"Authorization" : `Bearer ${token}`}),
    ...(options.headers && {...options.headers} as Record<string, string>)
  }

  return await fetch(full_endpoint, { 
    ...options,
    headers, 
  });
}
