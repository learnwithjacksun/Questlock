import { useLocation, useNavigate } from "react-router-dom";
import { Goback, Modal, ThemeToggle } from "../UI";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Loader, LogOut } from "lucide-react";
import useAuthStore from "@/Stores/useAuthStore";
import { toast } from "sonner";

const Header = () => {
  const { user, logout, isLoggingOut } = useAuthStore();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate()
  const handleLogout = ()=>{
    toast.promise(
      logout(),{
        loading: "Logging out...",
        success: () =>{
          navigate ("/auth")
          return "Logged out successfully!"
        },
        error: (err) => err
      }
    )
  }
  return (
    <>
      <header className="sticky top-0 backdrop-blur-md z-50">
        <nav className="h-[80px] layout flex items-center justify-between">
          {isDashboard ? (
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${user?.username}`}
                  alt=""
                  className="w-full object-cover h-full"
                />
              </div>
              <h3 className="text-lg font-medium capitalize">
                Hi, {user?.username}
              </h3>
            </div>
          ) : (
            <Goback />
          )}
          <ThemeToggle />
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen((prev) => !prev)}
            title="My Profile"
          >
            <div className="flex gap-4">
              <div className="h-22 w-22 rounded-full bg-foreground flex items-center justify-center overflow-hidden">
                <img
                  src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${user?.username}`}
                  alt=""
                  className="w-full object-cover h-full"
                />
              </div>
              <div>
                <div>
                  <h3 className="capitalize">{user?.username}</h3>
                  <p className="text-muted text-xs">{user?.email}</p>
                </div>
                <button onClick={handleLogout} className="text-sm h-10 px-4 bg-red-500 border border-red-500 text-white rounded-md mt-4">
                  {isLoggingOut ? <Loader size={18} className="animate-spin"/> : <LogOut size={18} />}
                  Logout
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
