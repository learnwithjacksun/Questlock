import { ItemList } from "@/Components/Dashboard";
import { Modal } from "@/Components/UI";
import { DashboardLayout } from "@/Layouts";
import { AnimatePresence } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            <form className="border-t border-line pt-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="key" className="text-sm font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-2 bg-foreground capitalize placeholder:normal-case"
                    placeholder="e.g My social media passcodes"
                  />
                </div>
                <p className="text-xs text-muted flex gap-2">
                  <HelpCircle
                    size={16}
                    className="flex-shrink-none text-yellow-500"
                  />{" "}
                  Vault name is required because it helps with faster
                  querying...
                </p>
              </div>
              <button
                type="submit"
                className="btn-primary mt-4 w-full text-sm h-10 rounded-md hover:opacity-90 transition-opacity duration-200 ease-in-out"
              >
                Create
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
