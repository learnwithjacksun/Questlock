import { Header } from "@/Components/Dashboard";
import useAuthStore from "@/Stores/useAuthStore";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, HelpCircle, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/Components/UI";
import { toast } from "sonner";
import { createSecurity } from "@/Services/user.service";

// Zod schema for validation
const schema = z.object({
  passcode: z
    .string()
    .min(1, "Passcode is required.")
    .min(6, "Passcode should be at least 6 characters.")
    .max(20, "Passcode should not exceed 20 characters."),
  securityQuestion: z.string().min(1, "Security question is required."),
  answer: z.string().min(1, "Answer is required."),
});

interface DashboardLayouProps {
  children: React.ReactNode;
  isDashboard?: boolean;
}
const DashboardLayout = ({ children }: DashboardLayouProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track the current step of the form
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SecurityFormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user?.passcode === null) {
      setIsOpen(true);
    }
  }, [setIsOpen, user?.passcode]);

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger("passcode");
      if (!isValid) return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const onSubmit = async (data: SecurityFormData) => {
    console.log("Form submitted with data:", data);
   
    setIsLoading(true);
    try {
      const res = await createSecurity(user?.$id, data);
      if (!res) {
        toast.error("Failed to create security information. Please try again.");
        return;
      }
      toast.success("Security information saved successfully.");
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };
  return (
    <>
      <div>
        <Header />
        <main className="layout pb-20">{children}</main>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={() =>
              toast.warning("Please complete the form to close the modal")
            }
            title="Add Security"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border-t border-line pt-4"
            >
              {/* Step 1: Passcode */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="passcode" className="text-sm font-medium">
                      Passcode <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("passcode")}
                      type="text"
                      className="input-2 bg-foreground placeholder:normal-case"
                      placeholder="e.g mysecretkey"
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
                    Passcode will be used to encrypt your vault. Make sure to
                    remember it.
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
                    The security question will be used to help recover your
                    vault if you forget your passcode.
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
                    {isLoading && <Loader size={20} className="animate-spin" />}
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              )}
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardLayout;
