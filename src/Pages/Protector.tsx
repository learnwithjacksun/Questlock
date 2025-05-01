import { useAuth } from "@/Hooks";
import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const Protector = () => {
  const { isCheckingAuth, currentUser } = useAuth();

  if (isCheckingAuth)
    return (
      <div className="h-screen w-screen text-semibold font-sora center gap-2">
        <Loader size={20} className="animate-spin text-purple-500" /> Loading...
      </div>
    );
  return currentUser && !isCheckingAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/passcode" replace={true} />
  );
};

export default Protector;
