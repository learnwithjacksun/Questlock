import { account, databases, DB, USERS } from "@/Config/appwrite";
import { ID } from "appwrite";

import { toast } from "sonner";
import { checkIfUserExistAlready, createUser } from "./user.service";

export const sendOTP = async (email: string) => {
  try {
    const res = await account.createEmailToken(ID.unique(), email);
    console.log(res);
    toast.success("Token sent successfully. Check your email for the OTP.");
    return res.userId;
  } catch (error) {
    console.error("Error sending token:", error);
    throw new Error(
      "An error occurred while sending the token. Please try again later."
    );
  }
};

export const verifyOTP = async (userId: string, otp: string, email: string) => {
  try {
    const session = await account.createSession(userId, otp);
    console.log("Session Active", session);
    const exist = await checkIfUserExistAlready(userId);
    if (!exist) {
      await createUser(userId, email);
    }

    const user = await databases.getDocument(DB, USERS, userId);
    console.log("User", user);  
    return {session, user};
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error(
      "An error occurred while verifying the OTP. Please try again later."
    );
  }
};

export const isUser = async (passcode: string, id: string | undefined) => {
    if (!id) {
      throw new Error("User ID is required to check user existence.");
    }

  try {
    const user = await databases.getDocument(DB, USERS, id);
    const password = user.passcode;
    if (passcode !== password) {
      throw new Error("Invalid passcode. Please try again.");
    }

    return true;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error(
      "An error occurred while logging in. Please try again later."
    );
  }
};
