interface ThemeStore {
    theme: string;
    toggleTheme: () => void;
    fetchTheme: () => void;
}