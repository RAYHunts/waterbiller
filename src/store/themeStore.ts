import { Appearance } from 'react-native';
import { create } from 'zustand';

interface ThemeState {
  preferredTheme: 'system' | 'light' | 'dark';
  usedTheme: 'light' | 'dark';
  setPreferredTheme: (theme: 'system' | 'light' | 'dark') => void;
  updateSystemTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  preferredTheme: 'system',
  usedTheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  setPreferredTheme(theme) {
    if (theme === 'system') {
      set({ preferredTheme: "system" });
      set({ usedTheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light' });
    } else {
      set({ preferredTheme: theme, usedTheme: theme });
    }
  },
  updateSystemTheme() {
    set({ usedTheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light' });
  },
}));

export { useThemeStore };
