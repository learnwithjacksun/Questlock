import { create } from "zustand";

const useThemeStore = create<ThemeStore>((set) => {
  const fetchTheme = () => {
    let storedTheme = localStorage.getItem("theme");

    if (!storedTheme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      storedTheme = prefersDark ? "dark" : "light";
    }

    set({ theme: storedTheme });
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  };

  const toggleTheme = () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return { theme: newTheme };
    });
  };

  return {
    theme: "light", // Default
    toggleTheme,
    fetchTheme,
  };
});

export default useThemeStore;
