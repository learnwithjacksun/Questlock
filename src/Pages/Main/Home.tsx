import { Footer, Header } from "@/Components/Main";
import { CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-80px)] flex md:justify-center justify-between py-10 pb-20 md:p-0 flex-col layout">
        <div>
          <span className="bg-secondary p-2 px-3 rounded-full border border-line text-muted text-sm">
           🔐 Secure, Simple, Portable
          </span>
          <h1 className="text-4xl md:text-6xl mt-4 font-sora font-bold bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
            Your private vault for sensitive information
          </h1>

          <ul className="text-left text-sm text-muted mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <CircleCheck size={20} className="text-green-600" />
              Store NIN, BVN,passwords, etc.
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck size={20} className="text-green-600" />
              Protected by end-to-end encryption
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck size={20} className="text-green-600" />
              Login with email OTP
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck size={20} className="text-green-600" />
              Only you can view your data
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 md:flex-row items-center mt-10 ">
          <Link
            to="/register"
            className="btn btn-primary w-full md:w-[200px] p-3 rounded-md"
          >
            Create a new Vault
          </Link>
          <Link
            to={"/login"}
            className="btn border border-line w-full md:w-[200px] p-3 rounded-md"
          >
            Access Vault
          </Link>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Home;
