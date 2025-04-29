import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/Stores";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <button className="btn-secondary" onClick={toggleTheme}>
      {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
