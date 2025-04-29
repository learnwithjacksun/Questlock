import { items } from "@/Constants/data";
import { ChevronRight } from "lucide-react";
import { Search } from "../UI";
import { useState } from "react";

const ItemList = () => {
  const [search, setSearch] = useState<string>("");

  const filteredItems = items.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <>
      <div className="space-y-4 mt-4">
        <Search search={search} setSearch={setSearch} />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border border-line bg-gradient-to-r dark:from-secondary to-transparent p-4 rounded-lg shadow-sm shadow-purple-500/10 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div>
                <h4 className="">{item.title}</h4>
                <p className="text-muted text-sm">
                  Number of items:
                  <span className="font-sora text-purple-500 font-medium">
                    {" "}
                    {item.values.length}
                  </span>
                </p>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemList;
