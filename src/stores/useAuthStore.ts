import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
    token: string | null;
    login: (token:string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,

            login: (newToken) => set({token: newToken}),

            logout: () => set({token: null}),

            isAuthenticated: () => !!get().token,
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useAuthStore;