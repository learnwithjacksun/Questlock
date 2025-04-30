import { ItemList } from "@/Components/Dashboard";
import { Modal } from "@/Components/UI";
import { DashboardLayout } from "@/Layouts";
import { createItem, fetchValues } from "@/Services/data.service";
import useAuthStore from "@/Stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { HelpCircle, Loader, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { string, z } from "zod";

const schema = z.object({
  title: string().min(1, { message: "Title is required!" }),
});

type FormSchema = z.infer<typeof schema>;

const Dashboard = () => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    setIsLoading(true);
    toast.promise(createItem(data.title, user?.$id), {
      loading: "Creating vault...",
      success: (res) => {
        setIsLoading(false);
        setIsOpen(false);
        fetchValues()
        navigate(`/details/?id=${res.itemId}`);
        return "Vault created successfully!";
      },
      error: (err) => {
        setIsLoading(false);
        return err.message;
      },
    });
  };

  return (
    <>
      <DashboardLayout>
        <ItemList />
      </DashboardLayout>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn text-sm fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white h-12 min-w-[200px] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out dark:text-[#212121]"
      >
        <Plus />
        Create New Vault
      </button>

      <AnimatePresence>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen((prev) => !prev)}
            title="New Vault"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border-t border-line pt-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="key" className="text-sm font-medium">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  className="input-2 bg-foreground"
                  placeholder="e.g My Social Passwords"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>

              <p className="text-xs text-muted mt-4 flex gap-2">
                <HelpCircle
                  size={16}
                  className="flex-shrink-none text-yellow-500"
                />
                Vault titles are essential for organizing and faster query.
              </p>

              <button
                type="submit"
                className="btn-primary mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
              >
                {isLoading ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  " Create Vault"
                )}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
