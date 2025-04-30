import { account, databases, DB, USERS } from "@/Config/appwrite";
import { Models } from "appwrite";
import { create } from "zustand";

interface AuthStore {
  isLoggingOut: boolean;
  isCheckingAuth: boolean;
  setIsCheckingAuth: (state: boolean) => void;
  isAuthenticated: boolean;
  setAuthState: (state: boolean) => void;
  user: Models.Document | null;
  setUser: (user: Models.Document) => void;
  logout: () => Promise<void>;
  fetchUser: (userId: string) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggingOut: false,
  isCheckingAuth: false,
  isAuthenticated: false,
  setIsCheckingAuth: (state) => set({ isCheckingAuth: state }),
  setAuthState: (state) => set({ isAuthenticated: state }),
  user: null,
  setUser: (user) => set({ user }),
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await account.deleteSession("current");
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ isLoggingOut: false });
    }
  },
  fetchUser: async (userId: string) => {
    try {
      const user = await databases.getDocument(DB, USERS, userId);
      set({ user });
    } catch (error) {
      console.error("Fetch user error:", error);
    }
  },
}));
export default useAuthStore;
