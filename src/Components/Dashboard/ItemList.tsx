import { ChevronRight, CircleCheck, KeyRound, Trash2 } from "lucide-react";
import { Search } from "../UI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";
import { useAuth, useData } from "@/Hooks";
import DeleteVault from "./DeleteVault";

const ItemList = () => {
  const navigate = useNavigate();
  const { items, isFetching, values } = useData();
  const { user } = useAuth();
  const [search, setSearch] = useState<string>("");
  const userItems = items.filter((item) => item.ownerId === user?.$id);
  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState("");
  const filteredItems = userItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const numberOfValues = (id: string): number => {
    const items = values.filter((value) => value.itemId === id);
    return items.length;
  };

  const handleItemClick = (id: string, item: Models.Document) => {
    navigate(`/details/?id=${id}`, { state: { item } });
    console.log("nav open");
  };

  const openModal = (id: string) => {
    setIsOpen(true);
    setItemId(id);
    console.log("modal open");
  };

  return (
    <>
      <div className="space-y-4 mt-4">
        <Search search={search} setSearch={setSearch} />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {/* Skeleton loader */}
          {isFetching.items &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse bg-muted rounded-lg border border-line p-4"
              >
                <div className="h-4 w-1/2 bg-secondary mb-2 rounded" />
                <div className="h-3 w-1/3 bg-secondary rounded" />
              </div>
            ))}

          {/* Loaded items */}
          {!isFetching.items &&
            filteredItems?.map((item) => (
              <div
                key={item.$id}
                className="border border-line relative bg-gradient-to-r from-secondary to-transparent p-4 rounded-2xl dark:shadow-sm shadow-purple-500/10 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                {numberOfValues(item.$id) > 0 ? (
                  <div className="top-4 right-4 bg-secondary text-xs text-muted center gap-2 rounded-full absolute border border-line p-1 pr-2">
                    <CircleCheck size={16} className="text-green-500" />
                    <span>Active</span>
                  </div>
                ) : (
                  <div className="top-4 right-4 bg-secondary text-xs text-muted center gap-2 rounded-full absolute border border-line p-1 px-2">
                    <KeyRound size={16} className=" text-yellow-500" />
                    <span>Empty</span>
                  </div>
                )}
                <div className="space-y-4">
                  <h4 className="text-main">{item.title}</h4>
                  <div>
                    <h2 className="text-3xl font-medium">
                      {numberOfValues(item.$id)}
                    </h2>
                    <p className="text-sm text-muted">
                      {numberOfValues(item.$id) > 1 ? "Items" : "Item"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(item.$id);
                      }}
                      className="center h-14 w-14 border border-line rounded-full"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item.$id, item);
                      }}
                      className="center h-14 w-14 bg-foreground border border-line rounded-full"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* No items found */}
          {!isFetching.items && filteredItems?.length === 0 && (
            <div className="col-span-full text-center text-muted text-sm">
              <img
                src="/vault.svg"
                width={200}
                className="mx-auto bg-secondary dark:bg-secondary/50 rounded-full"
              />
              <p>No Items found...</p>
            </div>
          )}
        </div>
      </div>

      <DeleteVault isOpen={isOpen} setIsOpen={setIsOpen} id={itemId} />
    </>
  );
};

export default ItemList;
