import { Header } from "@/Components/Dashboard";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardLayouProps {
  children: React.ReactNode;
  isDashboard?: boolean;
}
const DashboardLayout = ({ children }: DashboardLayouProps) => {
  return (
    <>
      <div className="relative">
        <Header />
        <main className="layout">{children}</main>
        <Link
          to={"/create"}
          className="btn fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white h-12 min-w-[150px] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out dark:text-[#212121]"
        >
          <Plus />
          Create New
        </Link>
      </div>
    </>
  );
};

export default DashboardLayout;
