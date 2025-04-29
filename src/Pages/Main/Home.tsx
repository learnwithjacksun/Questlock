import { useCountStore } from "@/Stores";
import { ThemeToggle } from "@/Components/UI";
import { ActionButtons, Libraries } from "@/Components/Main";
import { Github } from "lucide-react";


const Home = () => {
  const { count } = useCountStore();

  return (
    <div className="layout relative flex flex-col gap-2 min-h-[100dvh]">
      <header className="w-full h-[60px] flex justify-between items-center">
        <ThemeToggle />
        <a
          href="https://github.com/learnwithjacksun/jacksun-react-template"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary px-4 py-2 rounded-full gap-2"
        >
          <Github size={20} />
          <span>Use Template</span>
        </a>
      </header>
      <div className="center flex flex-col gap-4 text-center border-b border-line py-7">
        <div className="center gap-2">
          <img
            src="/react.svg"
            alt="logo"
            width={80}
            height={80}
            className="hover:rotate-120 transition-all duration-300"
          />
          <div className="h-[80px] w-[80px] bg-secondary rounded-xl border border-line text-4xl font-sora font-bold flex items-center justify-center">{count}</div>
        </div>
        <div>
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-500 text-4xl md:text-5xl font-sora font-bold">Jacksun React Template </h1>
          <p className="text-muted">
            A template for building a React app with Tailwind CSS and TypeScript
          </p>
        </div>

        <ActionButtons />
      </div>

      <Libraries />
    </div>
  );
};

export default Home;
