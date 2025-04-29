import { Lock } from "lucide-react";
import { ThemeToggle } from "../UI";

const Header = () => {
  return (
    <header>
      <nav className="layout flex items-center justify-between h-[60px] dark:bg-dark dark:text-white">
        <a href="" className="flex items-center gap-2">
          <div className="center h-9 w-9 bg-primary rounded-md text-white dark:text-[#121212]">
            <Lock size={22} />
          </div>
          <span className="font-sora text-xl font-medium">QuestLock</span>
        </a>

        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
