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
        <div className="border-b border-line pb-4">
          <h3 className="text-2xl font-bold font-sora bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
            Enter E-mail Address
          </h3>
          <p className="text-muted text-sm">
            An email address is required to identify and authenticate you.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <label htmlFor="email" className="text-xs text-muted">
            E-mail Address <span className="text-red-500">*</span>
          </label>
          <div>
            <input
              type="text"
              placeholder="e.g scorpion@gmail.com"
              className="input w-full"
              autoComplete="off"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
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
