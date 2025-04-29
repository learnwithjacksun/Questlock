import { Delete, New, Decrypt, DeleteVault } from "@/Components/Dashboard";
import { items } from "@/Constants/data";
import { DashboardLayout } from "@/Layouts";
import { Plus, Trash2 } from "lucide-react";
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
  new: boolean;
  edit: boolean;
  deleteVault: boolean;
};

const ItemDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const item = items.find((item) => item.id === id) as Item | undefined;

  const [isOpen, setIsOpen] = useState<ModalState>({
    decrypt: false,
    delete: false,
    new: false,
    edit: false,
    deleteVault: false,
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
                <p className="text-sm font-bold line-clamp-1">{value.value}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => toggleModal("decrypt", value)}
                  className="btn-primary text-xs h-8 px-4 rounded-md"
                >
                  Decrypt/ Copy
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
        <div className="flex items-center gap-4 mt-6 md:justify-center">
          <button
            onClick={() => setIsOpen({ ...isOpen, new: true })}
            className="bg-purple-700 text-xs text-white dark:text-main h-10 px-4 btn rounded-md cursor-pointer"
          >
            <Plus size={16} /> Add New
          </button>
          <button
            onClick={() => setIsOpen({ ...isOpen, deleteVault: true })}
            className="border border-red-500 text-xs text-red-500 dark:text-main h-10 px-4 btn rounded-md bg-red-500/10"
          >
            <Trash2 size={16} className="text-red-600" /> Delete Vault
          </button>
        </div>
      </DashboardLayout>

      <Decrypt isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
      <Delete isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
      <New isOpen={isOpen} setIsOpen={setIsOpen} />
      <DeleteVault isOpen={isOpen} setIsOpen={setIsOpen} id={item.id} />
    </>
  );
};

export default ItemDetails;
