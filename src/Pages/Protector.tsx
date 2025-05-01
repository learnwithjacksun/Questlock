import { useAuth } from "@/Hooks";
import { Loader } from "lucide-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Protector = () => {
  const location = useLocation();
  const { isCheckingAuth, currentUser } = useAuth();

  if (isCheckingAuth)
    return (
      <div className="h-screen w-screen text-semibold font-sora center gap-2">
        <Loader size={20} className="animate-spin text-purple-500" /> Loading...
      </div>
    );

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" replace state={{ from: location }} />
  );
};

export default Protector;
