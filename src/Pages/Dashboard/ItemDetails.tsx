import { Modal } from "@/Components/UI";
import { items } from "@/Constants/data";
import { DashboardLayout } from "@/Layouts";
import { AnimatePresence } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

type ItemValue = {
  id: string;
  key: string;
  value: string;
};

type Item = {
  id: string;
  title: string;
  values: ItemValue[];
};

type ModalState = {
  decrypt: boolean;
  delete: boolean;
};

const ItemDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const item = items.find((item) => item.id === id) as Item | undefined;

  const [isOpen, setIsOpen] = useState<ModalState>({
    decrypt: false,
    delete: false,
  });

  const [data, setData] = useState<ItemValue>({
    id: "",
    key: "",
    value: "",
  });

  const toggleModal = (modal: keyof ModalState, value: ItemValue) => {
    setIsOpen((prev) => ({ ...prev, [modal]: !prev[modal] }));
    setData(value);
  };

  if (!item) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <DashboardLayout>
        <div className="">
          <h1 className="text-2xl font-bold font-sora bg-clip-text text-transparent bg-gradient-to-r from-main to-purple-500">
            {item.title}
          </h1>
          <p className="text-muted text-sm">
            Here are the saved data in this directory
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {item.values.map((value) => (
            <div
              key={value.id}
              className="border border-line p-2 rounded-md space-y-4"
            >
              <div>
                <h4 className="text-muted text-sm">{value.key}</h4>
                <p className="text-sm font-bold">{value.value}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => toggleModal("decrypt", value)}
                  className="btn-primary text-xs h-8 px-4 rounded-md"
                >
                  Decrypt Data
                </button>
                <button
                  onClick={() => toggleModal("delete", value)}
                  className="border border-line text-xs h-8 px-4 rounded-md"
                >
                  <Trash2 size={16} className="text-red-600" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>

      <AnimatePresence>
        {isOpen.decrypt && (
          <Modal
            isOpen={isOpen.decrypt}
            onClose={() => setIsOpen({ ...isOpen, decrypt: false })}
            title="Decrypt Data"
          >
            <div>
              <div className="space-y-2">
                <p className="text-muted">
                  Do you wish to decrypt the value of this item?
                </p>
                <div className="border border-line rounded-md space-y-1">
                  <p className="text-xs p-2">{data.key}</p>
                  <p className="bg-foreground text-sm p-2">{data.value}</p>
                </div>
              </div>
              <div className="border-t border-line pt-4 mt-4 flex items-center gap-4">
                <button className="btn-primary text-xs h-10 px-4 rounded-md">
                  Decrypt Data
                </button>
                <button
                  onClick={() => setIsOpen({ ...isOpen, decrypt: false })}
                  className="border border-line text-xs h-10 px-4 rounded-md"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

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
              <button className="btn-primary text-xs h-10 px-4 rounded-md">
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
  );
};

export default ItemDetails;
