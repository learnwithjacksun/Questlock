import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI";
import { X } from "lucide-react";

const DeleteVault = ({ isOpen, setIsOpen, id }: DeleteVaultProps) => {
  const handleDelete = () => {
    console.log(id);
  };
  return (
    <>
      <AnimatePresence>
        {isOpen.deleteVault && (
          <Modal
            isOpen={isOpen.deleteVault}
            onClose={() => setIsOpen({ ...isOpen, deleteVault: false })}
            title="Delete Vault"
          >
            <div className="space-y-2">
              <p className="text-muted">
                Are you sure you want to delete this Vault?
              </p>
            </div>
            <div className="border-t border-line pt-4 mt-4 flex items-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white text-xs h-10 px-4 rounded-md"
              >
                Yes, delete vault
              </button>
              <button
                onClick={() => setIsOpen({ ...isOpen, delete: false })}
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
