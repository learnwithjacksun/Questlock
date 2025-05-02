import { AuthLayout } from "@/Layouts";
import { passcodeSchema } from "@/Schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuth } from "@/Hooks";

type PasscodeSchema = z.infer<typeof passcodeSchema>;
const Passcode = () => {
  const { user, logout, loading, currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasscodeSchema>({
    resolver: zodResolver(passcodeSchema),
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [navigate, user]);

  const onSubmit = async (data: PasscodeSchema) => {
    if (data.passcode === user.passcode) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 1000);
    } else {
      toast.error("Invalid Passcode");
    }
  };

  const handleLogout = () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: "Logged out successfully.",
      error: (err) => `${err}`,
    });
  };

  if (!currentUser) {
    return <Navigate to={"/auth"} replace={true} />;
  }

  return (
    <>
      <AuthLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:max-w-[400px] gap-4 w-full mx-auto">
            <div className="space-y-4">
              <div className="border-b border-line pb-4 space-y-3 center flex-col">
                <div className="h-22 w-22 rounded-full bg-purple-500/50 flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.username}`}
                    alt=""
                    className="w-full object-cover h-full"
                  />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
                    Hello, {user?.username}
                  </h3>
                  <p className="text-muted text-xs">
                    Enter your passcode to continue.
                  </p>
                  <p className="text-muted text-xs">
                    Not you?{" "}
                    <span
                      onClick={handleLogout}
                      className="cursor-pointer font-sora font-medium text-red-500"
                    >
                      {loading ? "Logging out..." : "Logout"}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Passcode"
                  className="input w-full text-center"
                  autoComplete="off"
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
              className="btn-primary mt-4 text-sm w-full h-10 rounded-md"
            >
              {isLoading ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <p className="mt-6 text-center underline text-xs font-semibold font-sora text-main ">
            <Link to="/recovery">I forgot passcode 🙆‍♂️</Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Passcode;
