import { AuthLayout } from "@/Layouts";
import { emaiilSchema } from "@/Schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";

import { useAuth } from "@/Hooks";

type EmailSchema = z.infer<typeof emaiilSchema>;
const Email = () => {
  const { sendOTP, loading, currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchema>({
    resolver: zodResolver(emaiilSchema),
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/passcode");
    }
  }, [currentUser, navigate]);

  const onSubmit = async (data: EmailSchema) => {
    await sendOTP(data.email);
  };

  return (
    <>
      <AuthLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-200px)] flex md:justify-center justify-between pb-20 pt-6 flex-col md:max-w-[400px] gap-4 w-full mx-auto">
            <div className="space-y-4">
              <div className="border-b border-line pb-4">
                <h3 className="text-2xl font-bold font-sora bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
                  Continue with E-mail Address
                </h3>
                <p className="text-muted text-sm">
                  An email address is required to identify and authenticate you.
                </p>
              </div>
              <label htmlFor="email" className="text-xs text-muted">
                E-mail Address <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="text"
                  placeholder="e.g scorpion@gmail.com"
                  className="input w-full"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
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
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default Email;
