import { Delete, New, Decrypt, DeleteVault } from "@/Components/Dashboard";
import { DashboardLayout } from "@/Layouts";
import { useDataStore } from "@/Stores";
import useAuthStore from "@/Stores/useAuthStore";
import { Models } from "appwrite";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

type ModalState = {
  decrypt: boolean;
  delete: boolean;
  new: boolean;
  edit: boolean;
  deleteVault: boolean;
};

const ItemDetails = () => {
  const {user} = useAuthStore()
  const { values } = useDataStore();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const location = useLocation()
  const {item} = location.state

  const allItemValues = values?.filter(
    (itemValue) => itemValue.itemId === id
  ) as Models.Document[];
  console.log(allItemValues);
  const [isOpen, setIsOpen] = useState<ModalState>({
    decrypt: false,
    delete: false,
    new: false,
    edit: false,
    deleteVault: false,
  });

  const [data, setData] = useState<Models.Document>();

  const toggleModal = (modal: keyof ModalState, value: Models.Document) => {
    setIsOpen((prev) => ({ ...prev, [modal]: !prev[modal] }));
    setData(value);
  };

  if (!item) {
    return <div className="text-center mt-4 text-muted text-sm">
      <h1> Not found! 😪</h1>
    </div>;
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

        {allItemValues.length === 0 && (
          <div className="p-4 border border-line bg-secondary rounded-md mt-6 flex items-center justify-center">
            <h3 className="text-muted text-sm">No Secret items here yet! 🙄</h3>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {allItemValues.map((value) => (
            <div
              key={value.id}
              className="border border-line p-2 rounded-md space-y-4"
            >
              <div>
                <h4 className="text-muted text-sm">{value.key}</h4>
                <p className="text-sm font-bold line-clamp-1 text-ellipsis">{value.value}</p>
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

      <Decrypt isOpen={isOpen} setIsOpen={setIsOpen} data={data} secret={user?.passcode} /> 
      <Delete isOpen={isOpen} setIsOpen={setIsOpen} data={data} id={item.$id} />
      <New isOpen={isOpen} setIsOpen={setIsOpen} id={item.$id} secret={user?.passcode} />
      <DeleteVault isOpen={isOpen} setIsOpen={setIsOpen} id={item.id} />
    </>
  );
};

export default ItemDetails;
