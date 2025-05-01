import { AuthLayout } from "@/Layouts";
import { otpSchema } from "@/Schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useAuth } from "@/Hooks";

type OTPSchema = z.infer<typeof otpSchema>;

const OTP = () => {
  const { verifyOTP, loading } = useAuth();
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

  const onSubmit = async (data: OTPSchema) => {
    await verifyOTP(userId, data.otp, email);
  };

  return (
    <>
      <AuthLayout>
        <div className="border-b border-line pb-4">
          <h3 className="text-2xl capitalize font-bold font-sora bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
            Verify e-mail address
          </h3>
          <p className="text-muted text-sm">
            A one-time password (OTP) was sent to {email}.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <label htmlFor="email" className="text-xs text-muted">
            OTP <span className="text-red-500">*</span>
          </label>
          <div>
            <input
              type="number"
              placeholder="e.g 123456"
              className="input w-full"
              autoComplete="off"
              {...register("otp")}
            />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
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
