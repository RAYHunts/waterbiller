import { create } from "zustand";


interface ThemeState {
    preferredTheme: "system" | "light" | "dark";
    setPreferredTheme: (theme: "system" | "light" | "dark") => void;
}

const useThemeStore = create<ThemeState>((set) => ({
    preferredTheme: "light",
    setPreferredTheme(theme) {
        set({ preferredTheme: theme });
    },
}));

export { useThemeStore };