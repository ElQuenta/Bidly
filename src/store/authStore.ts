import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { AuthStoreInterface } from "./interfaces/authStoreInterface"
import type { User } from "../interfaces/userInterface"

export const useAuthStore = create<AuthStoreInterface>()(
  persist((set) => ({
    user: {} as User,
    token: "",
    isAuth: false,

    signIn: async (user: User, token: string) => {
      set({user: user, token: token, isAuth: true})
    },
    signOut: () => {
      set({ user: {} as User, token: '', isAuth: false });
    }
  }), { name: "auth" })
)