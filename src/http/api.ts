import { Credentials, Room } from "@/Types/types";
import { api } from "./client";

export const login = (credentials: Credentials) => api.post("/users/login", credentials);

export const self = () => api.get("/users/current-user");

export const register = (credentials: Credentials) => api.post("/users/register", credentials)

export const googleOAuth = (token: string) => api.post("/auth/google",{token})

export const logout = () => api.post("/users/logout")

export const verifyEmailOtp = (id: string, otp: string) => api.post(`/users/verify-email/${id}`, otp);

export const createRoom = (data: Room) => api.post("/room/createRoom", data);

export const getAllRooms = () => api.get("/room/rooms");
