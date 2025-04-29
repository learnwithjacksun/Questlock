import { AuthLayout } from "@/Layouts";
import { otpSchema } from "@/Schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type OTPSchema = z.infer<typeof otpSchema>;

const OTP = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<OTPSchema>({
        resolver: zodResolver(otpSchema)
    })

    const onSubmit = (data: OTPSchema) => {
        console.log(data.otp)
    }
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
                  <p className="text-muted text-sm">A one-time password (OTP) was sent to the email you provided.</p>
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
                  <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full h-10 rounded-md"
            >
              Verify
            </button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default OTP;
