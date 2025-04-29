import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI";
import { X } from "lucide-react";

const Delete = ({isOpen, setIsOpen, data}: DeleteProps) => {
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
              <p className="text-muted">
                Are you sure you want to delete this item?
              </p>
              <div className="border border-line rounded-md space-y-1">
                <p className="text-xs p-2">{data.key}</p>
                <p className="bg-foreground text-sm p-2">{data.value}</p>
              </div>
            </div>
            <div className="border-t border-line pt-4 mt-4 flex items-center gap-4">
              <button className="bg-red-500 text-white text-xs h-10 px-4 rounded-md">
                Delete Data
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
  )
}

export default Delete