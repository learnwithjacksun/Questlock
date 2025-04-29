import { Lock } from "lucide-react";
import { ThemeToggle } from "../UI";

const Header = () => {
  return (
    <header>
      <nav className="layout flex items-center justify-between h-[80px] dark:bg-dark dark:text-white">
        <a href="" className="flex items-center gap-2">
          <div className="center h-9 w-9 bg-purple-600 rounded-md text-white dark:text-[#121212]">
            <Lock size={22} className="text-white" />
          </div>
          <span className="font-sora text-lg font-medium">QuestLock</span>
        </a>

        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
