import { AuthLayout } from "@/Layouts";
import { otpSchema } from "@/Schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import useAuthStore from "@/Stores/useAuthStore";
import { verifyOTP } from "@/Services/auth.service";

type OTPSchema = z.infer<typeof otpSchema>;

const OTP = () => {
  const { setAuthState, setUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPSchema>({
    resolver: zodResolver(otpSchema),
  });

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const email = searchParams.get("email") || "";

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !email) {
      toast.error("Invalid OTP link. Please try again.");
      navigate("/auth");
    }
  }, [userId, email, navigate]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: OTPSchema) => {
    console.log(data.otp);
    setLoading(true);

    try {
      const session = await verifyOTP(userId, data.otp, email);
      if (session) {
        setAuthState(true);
        setUser(session.user);
        toast.success("OTP verified successfully. Welcome to the app!");
        
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-200px)] flex md:justify-center justify-between pb-20 pt-6 flex-col md:max-w-[400px] gap-4 w-full mx-auto">
            <div className="space-y-4">
              <div className="border-b border-line pb-4">
                <h3 className="text-2xl capitalize font-bold font-sora bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
                  Verify e-mail address
                </h3>
                <p className="text-muted text-sm">
                  A one-time password (OTP) was sent to the email you provided.
                </p>
              </div>
              <label htmlFor="email" className="text-xs text-muted">
                OTP <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="number"
                  placeholder="e.g 123456"
                  className="input w-full"
                  {...register("otp")}
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.otp.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-4 fixed md:relative bottom-4 left-1/2 -translate-x-1/2 text-sm w-[90%] md:w-full h-10 rounded-md"
            >
              {loading && <Loader size={20} className="animate-spin" />}
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default OTP;
