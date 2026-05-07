import { create } from "zustand";

interface ThemeStore {
  darkMode: boolean;
  toggleTheme: () => void;
}
const storedTheme = localStorage.getItem("theme");

export const useThemeStore = create<ThemeStore>((set) => ({
  darkMode: storedTheme === "dark",

  toggleTheme: () =>
    set((state) => {
      const nextTheme = !state.darkMode;

      localStorage.setItem("theme", nextTheme ? "dark" : "light");

      return {
        darkMode: nextTheme,
      };
    }),
}));
