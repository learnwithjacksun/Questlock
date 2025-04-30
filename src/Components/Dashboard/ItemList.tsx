import { ChevronRight } from "lucide-react";
import { Search } from "../UI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserItems } from "@/Services/data.service";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/Stores/useAuthStore";
import { useDataStore } from "@/Stores";
import { Models } from "appwrite";

const ItemList = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { values } = useDataStore();
  const [search, setSearch] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["items", user?.$id],
    queryFn: () => getUserItems(user?.$id),
    enabled: !!user?.$id,
    
   
  });

 

  const filteredItems = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const numberOfValues = (id: string) => {
    const items = values?.filter((value) => value.itemId === id);
    return items?.length;
  };

  const handleItemClick = (id: string, item: Models.Document) => {
    navigate(`/details/?id=${id}`, {state: {item}});
  };

  return (
    <div className="space-y-4 mt-4">
      <Search search={search} setSearch={setSearch} />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {/* Skeleton loader */}
        {isLoading &&
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
        {!isLoading &&
          filteredItems?.map((item) => (
            <div
              key={item.$id}
              onClick={() => handleItemClick(item.$id, item)}
              className="flex items-center justify-between border border-line bg-gradient-to-r from-secondary to-transparent p-4 rounded-lg dark:shadow-sm shadow-purple-500/10 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="space-y-1">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-muted text-sm">
                  Number of items:
                  <span className="font-sora text-purple-500 font-medium">
                    {" "}
                    {numberOfValues(item.$id)}
                  </span>
                </p>

                {/* Optional: First value preview */}
                {/* {values?.some((v) => v.itemId === item.$id) && (
                  <p className="text-sm font-bold line-clamp-1 text-ellipsis">
                    {values.find((v) => v.itemId === item.$id)?.value}
                  </p>
                )} */}
              </div>
              <ChevronRight />
            </div>
          ))}

        {/* No items found */}
        {!isLoading && filteredItems?.length === 0 && (
          <div className="col-span-full text-center text-muted text-sm py-10">
            No items found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;
