import { privateApi, publicApi } from "./axios";

export const loginApi = (payload: any) =>
  publicApi.post("/api/auth/login", payload);

export const logoutApi = () => privateApi.post("/api/auth/logout");

export const refreshApi = () => publicApi.get("/api/auth/refresh");

export const signUpApi = (payload: any) =>
  publicApi.post("/api/users/register", payload);

export const getAllUser = () => privateApi("/api/users/");
