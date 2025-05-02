import { useAuth } from "@/Hooks";
import { AuthLayout } from "@/Layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  answer: z.string().min(1, { message: "Answer is required!" }),
});

type FormSchema = z.infer<typeof schema>;

const Recovery = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormSchema) => {
    setLoading(true);
    if (data.answer === user?.answer) {
      setShow(true);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      toast.error("Invalid Answer!");
      setLoading(false);
    }
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(user.passcode);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AuthLayout>
        <div className="border-b border-line pb-4">
          <h3 className="text-2xl font-bold font-sora bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
            Recover Passcode
          </h3>
          <p className="text-muted text-sm">
            Answer the security question to retrieve your passcode
          </p>
        </div>

        <div className="space-y-4 mt-6">
          <div className=" rounded-lg overflow-hidden border border-line">
            <p className="text-sm text-muted bg-background p-2">
              Security Question
            </p>
            <h1 className="font-semibold capitalize p-2 text-sm text-wrap bg-secondary">
              {user?.question}
            </h1>
          </div>

          {show && (
            <div className=" rounded-lg overflow-hidden border border-line">
              <p className="text-sm text-muted bg-background p-2">
                Retrieved Passcode
              </p>
              <div className="bg-foreground p-2 flex items-center justify-between">
                <p className="font-semibold capitalize p-2 text-sm text-wrap">
                  {user.passcode}
                </p>
                <button
                  onClick={handleCopy}
                  className="text-xs shadow bg-background dark:bg-secondary rounded-sm h-8 px-2"
                >
                  {copy ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} className="text-yellow-500" />
                  )}{" "}
                  {copy ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
        {!show && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-xs text-muted">
                Answer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g 123456"
                className="input w-full lowercase"
                autoComplete="off"
                {...register("answer")}
              />
              {errors.answer && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.answer.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
            >
              {loading ? <Loader className="animate-spin" /> : "Check"}
            </button>

          </form>


        )}
             <p className="mt-6 text-center underline text-xs font-semibold font-sora text-main ">
                        <Link to="/passcode">{show ? "Use retrieved passcode now": "I remember my passcode"} 💁‍♂️</Link>
                      </p>
      </AuthLayout>
    </>
  );
};

export default Recovery;
