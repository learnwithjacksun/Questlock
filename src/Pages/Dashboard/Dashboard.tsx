import { ItemList } from "@/Components/Dashboard";
import { DashboardLayout } from "@/Layouts";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <ItemList />
      </DashboardLayout>
      <Link
          to={"/create"}
          className="btn text-sm fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white h-12 min-w-[150px] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out dark:text-[#212121]"
        >
          <Plus />
          Create New
        </Link>
    </>
  );
};

export default Dashboard;
