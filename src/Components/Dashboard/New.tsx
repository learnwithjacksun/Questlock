import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createValue, fetchValues } from "@/Services/data.service";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";

const schema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
})

type formSchema = z.infer<typeof schema>;



const New = ({ isOpen, setIsOpen, id, secret }: NewProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const {register, handleSubmit, formState:{errors}} = useForm<formSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      key: "",
      value: "",
    },
  })

  const onSubmit = async (data: formSchema) => {
    console.log(data)
setIsLoading(true)
  toast.promise(
    createValue(id, data.key, data.value, secret),
    {
      loading: "Creating item...",
      success: () => {
        setIsLoading(false)
        setIsOpen({ ...isOpen, new: false });
        fetchValues()
        return "Item created successfully!";
      },
      error: (err) => {
        console.error(err);
        setIsLoading(false)
        return "Failed to create item.";
      },
    }
  )
    
  }

  
  return (
    <>
      <AnimatePresence>
        {isOpen.new && (
          <Modal
            isOpen={isOpen.new}
            onClose={() => setIsOpen({ ...isOpen, new: false })}
            title="New Item"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="border-t border-line pt-4">
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
                  {errors.key && <p className="text-red-500 text-xs">{errors.key.message}</p>}
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
                  {errors.value && <p className="text-red-500 text-xs">{errors.value.message}</p>}
                </div>
              </div>
              <button
                type="submit"
                className="btn-primary mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
              >
                {isLoading ? <Loader size={18} className="animate-spin"/> : "Add Item"}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default New;
