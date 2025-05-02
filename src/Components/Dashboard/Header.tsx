import { useLocation, useNavigate } from "react-router-dom";
import { Goback, Modal, ThemeToggle } from "../UI";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Edit, Loader, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/Hooks";
import { decryptData } from "@/Config/crypto";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().trim().min(1, { message: "Username is required!" }),
});


type FormSchema = z.infer<typeof schema>;

const Header = () => {
  const { user, logout, loading, editName, isEditing } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.username,
    },
  });

  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);

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

  const handleEdit = async (data: FormSchema) => {
    toast.promise(editName(data.name), {
      loading: "Saving...",
      success: () => {
        setEdit(false);
        reset({ name: data.name });
        return "Username updated!";
      },
      error: () => "Failed to update username.",
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
                <span className="bg-clip-text capitalize text-transparent bg-gradient-to-r from-main to-purple-500">
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
            onClose={() => {
              setIsOpen(false);
              setEdit(false);
              reset({ name: user.username });
            }}
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
              <div className="space-y-4">
                {isEdit ? (
                  <form
                    onSubmit={handleSubmit(handleEdit)}
                    className="flex flex-col gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Enter new username..."
                      className="input w-full lowercase"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name.message}</p>
                    )}
                    <button
                      type="submit"
                      className="text-xs btn-primary rounded-lg h-10 flex items-center justify-center gap-2"
                    >
                      {isEditing ? (
                        <Loader size={16} className="animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </button>
                  </form>
                ) : (
                  <div>
                    <h3 className="capitalize flex items-center gap-4">
                      {user?.username}
                      <span
                        onClick={() => setEdit(true)}
                        className="center gap-1 text-purple-500 font-semibold cursor-pointer text-sm"
                      >
                        <Edit size={16} /> Edit
                      </span>
                    </h3>
                    <p className="text-muted text-xs">{decryptedEmail}</p>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="text-sm h-9 px-4 bg-red-500 border border-red-500 text-white rounded-md mt-4 flex items-center gap-2"
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
