import { databases, DB, ITEMS, VALUES } from "@/Config/appwrite";
import { encryptData } from "@/Config/crypto";
import { ID, Query } from "appwrite";

export const createItem = async (title: string, ownerId: string | undefined) => {

  try {
    const itemDoc = await databases.createDocument(DB, ITEMS, ID.unique(), {
      ownerId,
      title,
    });
    const itemId = itemDoc.$id;
    await fetchValues()
    return { itemDoc, itemId };
  } catch (error) {
    console.error("Error creating item with values:", error);
    throw new Error("Failed to create item and values.");
  }
};

export const createValue = async (
  itemId: string,
  key: string,
  value: string,
) => {
  try {
    const encryptedValue = encryptData(value);
    const res = await databases.createDocument(DB, VALUES, ID.unique(), {
      itemId,
      key,
      value: encryptedValue,
    });
    await fetchValues()
    console.log("Value created successfully:", res);
    return res;
  } catch (error) {
    console.error("Error creating value:", error);
    throw new Error("Failed to create value.");
  }
};

export const deleteValue = async (id:string) =>{
  try {
    const res = await databases.deleteDocument(DB, VALUES, id)
    return res
  } catch (error) {
    console.error("Error deleting value:", error);
    throw new Error("Failed to delete value.");
  }
}

export const deleteVault = async (id:string) =>{
  try {
    const res = await databases.deleteDocument(DB, ITEMS, id)
    return res
  } catch (error) {
    console.error("Error deleting value:", error);
    throw new Error("Failed to delete value.");
  }
}

export const getUserItems = async (userId: string | undefined) => {
  if (!userId) throw new Error("User ID not found!");
  try {
    const res = await databases.listDocuments(DB, ITEMS, [
      Query.equal("ownerId", userId),
      Query.orderDesc("$createdAt"),
    ]);
    if (res.documents.length === 0) {
      return null;
    }
    return res.documents;
  } catch (error) {
    console.error("Error fetching user items:", error);
    throw new Error("Failed to fetch user items.");
  }
};

export const fetchValues = async () => {
  try {
    const res = await databases.listDocuments(DB, VALUES, [
      Query.orderDesc("$createdAt"),
    ]);
    return res.documents;
  } catch (error) {
    console.error("Error fetching item values:", error);
    throw new Error("Failed to fetch item values.");
  }
};
