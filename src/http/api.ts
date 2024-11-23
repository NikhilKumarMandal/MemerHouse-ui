import { Credentials } from "@/Types/types";
import { api } from "./client";

export const login = (credentials: Credentials) => api.post("/users/login", credentials);

export const register = (credentials: Credentials) => api.post("/users/register",credentials)