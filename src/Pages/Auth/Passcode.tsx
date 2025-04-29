import { AuthLayout } from "@/Layouts";
import { passcodeSchema } from "@/Schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type PasscodeSchema = z.infer<typeof passcodeSchema>;
const Passcode = () => {
        const {register, handleSubmit, formState:{errors}} = useForm<PasscodeSchema>({
            resolver: zodResolver(passcodeSchema)
        })
    
        const onSubmit = (data: PasscodeSchema) => {
            console.log(data.passcode)
        }
  return (
    <>
      <AuthLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-200px)] flex md:justify-center justify-between pb-20 pt-6 flex-col md:max-w-[400px] gap-4 w-full mx-auto">
            <div className="space-y-4">
              <div className="border-b border-line pb-4">
                <h3 className="text-xl font-medium font-sora">Welcome back, Gift</h3>
                <p className="text-muted text-sm">
                  Enter your passcode to continue.
                </p>
                <p className="text-muted text-sm">
                  Not you? <span className="font-sora font-medium text-main">Logout</span>
                </p>
                
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
                  <p className="text-red-500 text-xs mt-1">{errors.passcode.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full h-10 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>

      </AuthLayout>
    </>
  );
};

export default Passcode;
