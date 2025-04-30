import { AuthLayout } from "@/Layouts";
import { passcodeSchema } from "@/Schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@/Stores/useAuthStore";
import { toast } from "sonner";
import { isUser } from "@/Services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader } from "lucide-react";

type PasscodeSchema = z.infer<typeof passcodeSchema>;
const Passcode = () => {
  const { user, logout, isLoggingOut } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasscodeSchema>({
    resolver: zodResolver(passcodeSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: PasscodeSchema) => {
    console.log(data.passcode);
setIsLoading(true); 
    try {
      const res = await isUser(data.passcode, user?.$id);
      if (res) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error verifying passcode:", error);
      toast.error((error as Error).message);
    } 
    finally {
      setIsLoading(false);
    }
  
  };

  const handleLogout = () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: "Logged out successfully.",
      error: (err) => `${err}`,
    });
  };

  return (
    <>
      <AuthLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-200px)] flex md:justify-center justify-between pb-20 pt-6 flex-col md:max-w-[400px] gap-4 w-full mx-auto">
            <div className="space-y-4">
              <div className="border-b border-line pb-4 space-y-3 center flex-col">
                <div className="h-22 w-22 rounded-full bg-foreground flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${user?.username}`}
                    alt=""
                    className="w-full object-cover h-full"
                  />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-bold font-sora capitalize bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
                    Hello, {user?.username}
                  </h3>
                  <p className="text-muted text-sm">
                    Enter your passcode to continue.
                  </p>
                  <p className="text-muted text-sm">
                    Not you?{" "}
                    <span
                      onClick={handleLogout}
                      className="cursor-pointer font-sora font-medium text-red-500"
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </span>
                  </p>
                </div>
              </div>
              <label htmlFor="passcode" className="text-xs text-muted">
                Passcode <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="text"
                  placeholder="e.g 123456"
                  className="input w-full"
                  {...register("passcode")}
                />
                {errors.passcode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.passcode.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary text-sm w-full h-10 rounded-md"
            >
              {isLoading && <Loader size={18} className="animate-spin" />}
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default Passcode;
