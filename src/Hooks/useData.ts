import { DataContext } from "@/Context/DataContext";
import { useContext } from "react";

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider!");
  }

  return { ...context };
};

export default useData;
