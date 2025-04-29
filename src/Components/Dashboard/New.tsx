import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI";



const New = ({ isOpen, setIsOpen }: NewProps) => {
  return (
    <>
      <AnimatePresence>
        {isOpen.new && (
          <Modal
            isOpen={isOpen.new}
            onClose={() => setIsOpen({ ...isOpen, new: false })}
            title="New Item"
          >
            <form className="border-t border-line pt-4">
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
                  />
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
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn-primary mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
              >
                Add Item
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default New;
