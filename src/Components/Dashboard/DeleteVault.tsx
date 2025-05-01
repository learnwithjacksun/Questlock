import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI";
import { Loader, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useData } from "@/Hooks";

const DeleteVault = ({ isOpen, setIsOpen, id }: DeleteVaultProps) => {
  const { deleteItem } = useData();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    toast.promise(deleteItem(id), {
      loading: "Deleting...",
      success: () => {
        setLoading(false);
        setIsOpen(false);
        return "Deleted Successfully!";
      },
      error: (err) => {
        setLoading(false);
        setIsOpen(false);
        return err.message;
      },
    });
  };
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Delete Vault"
          >
            <div className="space-y-2">
              <p className="text-muted text-sm">
                Are you sure you want to delete this Vault?
              </p>
            </div>
            <div className="border-t border-line pt-4 mt-4 flex items-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white text-xs h-10 px-4 rounded-md"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    <span>Deleting</span>
                  </>
                ) : (
                  "Yes, delete vault"
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="border border-line text-xs h-10 px-4 rounded-md"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteVault;
