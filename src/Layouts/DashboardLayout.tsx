import { Header } from "@/Components/Dashboard";


interface DashboardLayouProps {
  children: React.ReactNode;
  isDashboard?: boolean;
}
const DashboardLayout = ({ children }: DashboardLayouProps) => {
  return (
    <>
      <div className="relative">
        <Header />
        <main className="layout pb-20">{children}</main>
      
      </div>
    </>
  );
};

export default DashboardLayout;
