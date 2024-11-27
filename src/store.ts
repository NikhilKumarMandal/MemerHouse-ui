import { devtools } from "zustand/middleware";
import { create } from "zustand";
export interface User {
    _id: string;
    username: string;
    email: string,
    isVerified: boolean,
    avatar?: string
}

interface AuthState{
    user: null | User;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
})))
