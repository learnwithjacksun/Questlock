import { useLocation, useNavigate } from "react-router-dom";
import { Goback, Modal, ThemeToggle } from "../UI";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Loader, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/Hooks";
import { decryptData } from "@/Config/crypto";

const Header = () => {
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: () => {
        navigate("/auth");
        return "Logged out successfully!";
      },
      error: (err) => err,
    });
  };

  const decryptedEmail = decryptData(user.email);
  return (
    <>
      <header className="sticky top-0 backdrop-blur-md z-50 border-b border-line">
        <nav className="h-[80px] layout flex items-center justify-between">
          {isDashboard ? (
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="h-10 w-10 bg-purple-500/50 center rounded-full overflow-hidden">
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.username}`}
                  alt=""
                  className="w-full object-cover h-full"
                />
              </div>
              <h3 className="text-lg font-medium capitalize">
                Hi,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
                  {user?.username}
                </span>
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
              <div className="h-22 w-22 rounded-full bg-purple-500/50 flex items-center justify-center overflow-hidden">
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.username}`}
                  alt=""
                  className="w-full object-cover h-full"
                />
              </div>
              <div>
                <div>
                  <h3 className="capitalize">{user?.username}</h3>
                  <p className="text-muted text-xs">{decryptedEmail}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm h-10 px-4 bg-red-500 border border-red-500 text-white rounded-md mt-4"
                >
                  {loading ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <LogOut size={18} />
                  )}
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
