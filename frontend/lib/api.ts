import axios from "axios";

const API_BASE =  "http://localhost:8890";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export async function apiGet<T>(path: string): Promise<T> {
  const res = await api.get<T>(path);
  return res.data;
}

export async function apiPost<T>(path: string, data: any): Promise<T> {
  const res = await api.post<T>(path, data);
  return res.data;
}

export async function apiPut<T>(path: string, data: any): Promise<T> {
  const res = await api.put<T>(path, data);
  return res.data;
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await api.delete<T>(path);
  return res.data;
}
