import { useCallback, useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import { ID, Models, Query } from "appwrite";
import { client, databases, DB, ITEMS, VALUES } from "@/Config/appwrite";
import { encryptData } from "@/Config/crypto";


const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState({
    items: false,
    values: false
  });
  const [items, setItems] = useState<Models.Document[]>([]);
  const [values, setValues] = useState<Models.Document[]>([]);

  const createItem = async (title: string, ownerId: string | undefined) => {
    setIsCreating(true);
    try {
      const itemDoc = await databases.createDocument(DB, ITEMS, ID.unique(), {
        ownerId,
        title,
      });
      setItems((prev) => [itemDoc, ...prev]);
    } catch (error) {
      console.error("Error creating item with values:", error);
      throw new Error("Failed to create item and values.");
    } finally {
      setIsCreating(false);
    }
  };

  const createValue = async (itemId: string, key: string, value: string) => {
    setIsCreating(true);
    try {
      const encryptedValue = encryptData(value);
      const res = await databases.createDocument(DB, VALUES, ID.unique(), {
        itemId,
        key,
        value: encryptedValue,
      });

      setValues((prev) => [res, ...prev]);
    } catch (error) {
      console.error("Error creating value:", error);
      throw new Error("Failed to create value.");
    } finally {
      setIsCreating(false);
    }
  };

  const fetchValues = useCallback(async () => {
    setIsFetching(prev => ({...prev, values: true}))
    try {
      const values = await databases.listDocuments(DB, VALUES, [
        Query.orderDesc("$createdAt"),
      ]);
      setValues(values.documents);
    } catch (error) {
      console.error("Error fetching item with values:", error);
      throw new Error("Failed to create item and values.");
    } finally{
      setIsFetching(prev => ({...prev, values: false}))
    }
  }, []);

  const fetchItems = useCallback(async () => {
    setIsFetching(prev => ({...prev, items: true}))
    try {
      const items = await databases.listDocuments(DB, ITEMS, [
        Query.orderDesc("$createdAt"),
      ]);
      setItems(items.documents);
      console.log(items);
    } catch (error) {
      console.error("Error fetching item with values:", error);
      throw new Error("Failed to create item and values.");
    } finally{
      setIsFetching(prev => ({...prev, items: false}))
    }
  }, []);

  useEffect(() => {
    fetchItems();
    fetchValues();
  }, [ fetchValues, fetchItems]);


  
   const deleteItem = async (id:string) =>{
    try {
     await databases.deleteDocument(DB, ITEMS, id)
     fetchItems()
    } catch (error) {
      console.error("Error deleting value:", error);
      throw new Error("Failed to delete value.");
    }
  }

  useEffect(() => {
    const unsubscribe = client.subscribe(
      [
        `databases.${DB}.collections.${ITEMS}.documents`,
        `databases.${DB}.collections.${VALUES}.documents`,
      ],
      (response) => {
        if (
          response.events.some(
            (event) =>
              event.includes("create") ||
              event.includes("update") ||
              event.includes("delete")
          )
        ) {
          fetchValues();
          fetchItems();
        }
      }
    );

    return () => unsubscribe();
  }, [fetchItems, fetchValues]);

  const context: DataContextTypes = {
    items,
    values,
    isCreating,
    isFetching,
    createItem,
    createValue,
    deleteItem
  };


  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};


export default DataProvider;
