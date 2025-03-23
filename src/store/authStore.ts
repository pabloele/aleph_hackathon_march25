import { create } from "zustand";
import axios from "axios";

// Definir la estructura del estado
interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (worldId: string) => Promise<{ success: boolean; user?: any; error?: string }>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: true,

  login: async (worldId: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { worldId });
      const { token, user } = response.data;

      set({ user, token, isAuthenticated: true });

      return { success: true, user };
    } catch (error: any) {
      console.error("Error en login:", error);
      return { success: false, error: error.response?.data?.message || "Error desconocido" };
    }
  },

  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

export default useAuthStore;
