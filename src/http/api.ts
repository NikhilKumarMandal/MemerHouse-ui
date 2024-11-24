import { Credentials } from "@/Types/types";
import { api } from "./client";

export const login = (credentials: Credentials) => api.post("/users/login", credentials);

export const self = () => api.get("/users/current-user");

export const register = (credentials: Credentials) => api.post("/users/register", credentials)

export const verifyEmailOtp = (id: string, otp: string) => api.post(`/users/verify-email/${id}`, otp);
