import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI";
import { Loader, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteValue } from "@/Services/data.service";

const Delete = ({isOpen, setIsOpen, data}: DeleteProps) => {
    const [loading, setLoading] = useState(false);
  const handleDeleteValue = (id: string) => {
    setLoading(true);
    toast.promise(deleteValue(id), {
      loading: "Deleting...",
      success: () => {
        setLoading(false);
        setIsOpen(prev => ({...prev, delete:false}))
        return "Deleted Successfully!";
      },
      error: (err) => {
        setLoading(false);
        return err.message;
      },
    });
  };
  return (
    <>
     <AnimatePresence>
        {isOpen.delete && (
          <Modal
            isOpen={isOpen.delete}
            onClose={() => setIsOpen({ ...isOpen, delete: false })}
            title="Delete Data"
          >
            <div className="space-y-2">
              <p className="text-muted text-sm">
                Are you sure you want to delete this item?
              </p>
              <div className="border border-line rounded-md space-y-1">
                <p className="text-xs p-2">{data.key}</p>
                <p className="bg-foreground text-xs p-2">{data.value}</p>
              </div>
            </div>
            <div className="border-t border-line pt-4 mt-4 flex items-center gap-4">
              <button onClick={()=> handleDeleteValue(data.$id)} className="bg-red-500 text-white text-xs h-10 px-4 rounded-md">
                {loading ? (
                  <>
                  <Loader size={18} className="animate-spin"/> 
                  <span>Deleting...</span>
                  </>
                  ): "Delete Data"}
              </button>
              <button
                onClick={() => setIsOpen({ ...isOpen, delete: false })}
                className="border border-line bg-foreground text-xs h-10 px-4 rounded-md"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default Delete