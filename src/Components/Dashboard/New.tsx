import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useData } from "@/Hooks";

const schema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
});

type formSchema = z.infer<typeof schema>;

const New = ({ isOpen, setIsOpen, id}: NewProps) => {
  const {createValue, isCreating} = useData()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      key: "",
      value: "",
    },
  });

  const onSubmit = async (data: formSchema) => {
    toast.promise(createValue(id, data.key, data.value), {
      loading: "Creating item...",
      success: () => {
        setIsOpen({ ...isOpen, new: false });
        return "Item created successfully!";
      },
      error: (err) => {
        console.error(err);
        return "Failed to create item.";
      },
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen.new && (
          <Modal
            isOpen={isOpen.new}
            onClose={() => setIsOpen({ ...isOpen, new: false })}
            title="New Item"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border-t border-line pt-4"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="key" className="text-sm font-medium">
                    Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="key"
                    className="input-2 bg-foreground"
                    placeholder="e.g My Password"
                    {...register("key")}
                  />
                  {errors.key && (
                    <p className="text-red-500 text-xs">{errors.key.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="value" className="text-sm font-medium">
                    Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="value"
                    className="input-2 bg-foreground"
                    placeholder="e.g 12345678"
                    {...register("value")}
                  />
                  {errors.value && (
                    <p className="text-red-500 text-xs">
                      {errors.value.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="btn-primary mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
              >
                {isCreating ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  "Add Item"
                )}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default New;
