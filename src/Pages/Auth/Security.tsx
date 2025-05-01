import { useAuth } from "@/Hooks";
import { AuthLayout } from "@/Layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, HelpCircle, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  passcode: z
    .string()
    .min(1, "Passcode is required.")
    .min(6, "Passcode should be at least 6 characters.")
    .max(20, "Passcode should not exceed 20 characters."),
  securityQuestion: z.string().min(1, "Security question is required."),
  answer: z.string().min(1, "Answer is required."),
});

const Security = () => {
  const { createSecurity, loading, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SecurityFormData>({
    resolver: zodResolver(schema),
  });
  const handleNextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger("passcode");
      if (!isValid) return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const onSubmit = async (data: SecurityFormData) => {
    await createSecurity(user.$id, data);
  };
  return (
    <>
      <AuthLayout>
        <div className="border-b border-line pb-4">
          <h3 className="text-2xl font-bold font-sora bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
            Add Extra Security
          </h3>
          <p className="text-muted text-sm">
            Add Passcode for extra layer of security
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          {currentStep === 1 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="passcode" className="text-sm font-medium">
                  Passcode <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("passcode")}
                  type="text"
                  className="input-2 placeholder:normal-case"
                  placeholder="e.g mysecretkey123"
                />
                {errors.passcode && (
                  <p className="text-xs text-red-500">
                    {errors.passcode.message}
                  </p>
                )}
              </div>
              <p className="text-xs text-muted flex gap-2">
                <HelpCircle
                  size={16}
                  className="flex-shrink-none text-yellow-500"
                />
                For data security reasons, an anonymous username will be
                generated for you. You can change it later in settings.
              </p>
            </div>
          )}

          {/* Step 2: Security Question */}
          {currentStep === 2 && (
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="securityQuestion"
                  className="text-sm font-medium"
                >
                  Security Question <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("securityQuestion")}
                  type="text"
                  className="input-2 bg-foreground lowercase placeholder:normal-case"
                  placeholder="e.g What is your mother's maiden name?"
                />
                {errors.securityQuestion && (
                  <p className="text-xs text-red-500">
                    {errors.securityQuestion.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <label htmlFor="answer" className="text-sm font-medium">
                  Answer <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("answer")}
                  type="text"
                  className="input-2 bg-foreground lowercase placeholder:normal-case"
                  placeholder="e.g My mother's name"
                />
                {errors.answer && (
                  <p className="text-xs text-red-500">
                    {errors.answer.message}
                  </p>
                )}
              </div>
              <p className="text-xs text-muted mt-6 flex gap-2">
                <HelpCircle
                  size={16}
                  className="flex-shrink-none text-yellow-500"
                />
                The security question will be used to help recover your vault if
                you forget your passcode.
              </p>
            </div>
          )}

          {/* Button Logic */}
          {currentStep === 1 && (
            <button
              type="button"
              onClick={handleNextStep} // Go to next step
              className="btn-primary mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
            >
              Next <ArrowRight size={16} />
            </button>
          )}
          {currentStep === 2 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="border border-line mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
              >
                Previous
              </button>
              <button
                type="submit"
                className="btn-primary mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
              >
                {loading && <Loader size={20} className="animate-spin" />}
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </form>
      </AuthLayout>
    </>
  );
};

export default Security;
