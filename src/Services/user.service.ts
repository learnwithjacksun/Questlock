import { databases, DB, USERS } from "@/Config/appwrite";
import { Query } from "appwrite";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  Config,
} from "unique-names-generator";

const randomNameConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: ".",
  length: 2,
};

const username = uniqueNamesGenerator(randomNameConfig);

export const checkIfUserExistAlready = async (id: string) => {
  try {
    const res = await databases.listDocuments(DB, USERS, [
      Query.equal("$id", id),
    ]);
    if (res.documents.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw new Error(
      "An error occurred while checking user existence. Please try again later."
    );
  }
};

export const createUser = async (userId: string, email: string) => {
  try {
    const res = await databases.createDocument(DB, USERS, userId, {
      userId: userId,
      username: username,
      email: email,
    });
    console.log("User created successfully:", res);
    return res;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(
      "An error occurred while creating the user. Please try again later."
    );
  }
};

export const createSecurity = async (
  id: string | undefined,
  data: SecurityFormData
) => {
  try {
    if (!id) {
      throw new Error("User ID is required to create security.");
    }
     const validQuestion = data.securityQuestion.includes("?")
          ? data.securityQuestion
          : `${data.securityQuestion}?`;
    const res = await databases.updateDocument(DB, USERS, id, {
      passcode: data.passcode,
      question: validQuestion,
      answer: data.answer,
    });
    return res;
  } catch (error) {
    console.error("Error creating security:", error);
    throw new Error(
      "An error occurred creating security. Please try again later."
    );
  }
};
