import { Models } from "appwrite";
import { create } from "zustand";

interface DataStore {
  items: Models.Document[] ;
  setItems: (items: Models.Document[]) => void;
  values: Models.Document[] | null;
  setValues: (values: Models.Document[] | null) => void;
}

const useDataStore = create<DataStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  values: null,
  setValues: (values) => set({ values }),
}));

export default useDataStore;
