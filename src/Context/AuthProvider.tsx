import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ID, Models, Query } from "appwrite";
import { account, databases, DB, USERS } from "@/Config/appwrite";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { randomName } from "@/Config/name";
import { encryptData } from "@/Config/crypto";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.Document>();
  const [currentUser, setCurrentUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const navigate = useNavigate();

  const sendOTP = async (email: string) => {
    setLoading(true);
    try {
      const res = await account.createEmailToken(ID.unique(), email);
      navigate(`/verify?email=${email}&userId=${res.userId}`);
      toast.success("Token sent successfully. Check your email for the OTP.");
    } catch (error) {
      console.error("Error sending token:", error);
      throw new Error(
        "An error occurred while sending the token. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (userId: string, otp: string, email: string) => {
    setLoading(true);
    try {
      const session = await account.createSession(userId, otp);
      console.log("Session Active", session);
      await checkIfUserExistAlready(userId, email);
      await getUser();
      toast.success("Verification Successful!")
    } catch (error) {
      console.error("Error verifying token:", error);
      throw new Error(
        "An error occurred while verifying the OTP. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const checkIfUserExistAlready = async (id: string, email: string) => {
    try {
      const res = await databases.listDocuments(DB, USERS, [
        Query.equal("$id", id),
      ]);
      if (res.documents.length === 0) {
        try {
          const encryptedEmail = encryptData(email);
          await databases.createDocument(DB, USERS, id, {
            userId: id,
            username: randomName,
            email: encryptedEmail,
          });
          await getUser()
          navigate("/security");
        } catch (error) {
          console.error("Error creating new user:", error);
          throw new Error(
            "An error occurred while creating an account. Please try again later."
          );
        }
      } else {
        await getUser()
        navigate("/passcode");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw new Error(
        "An error occurred while checking user existence. Please try again later."
      );
    }
  };

  const getUser = async () => {
    try {
      const user = await account.get();
      if (user) {
        const res = await databases.getDocument(DB, USERS, user.$id);
        setUser(res);
        setCurrentUser(user)
      }
    } catch (error) {
      console.error("Error getting user:", error);
      throw new Error(
        "An error occurred while fetching your data. Please try again later."
      );
    }
  };

  const createSecurity = async (id: string, data: SecurityFormData) => {
    setLoading(true);
    try {
      const validQuestion = data.securityQuestion.includes("?")
        ? data.securityQuestion
        : `${data.securityQuestion}?`;
      await databases.updateDocument(DB, USERS, id, {
        passcode: data.passcode,
        question: validQuestion,
        answer: data.answer,
      });
      await getUser();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating security:", error);
      throw new Error(
        "An error occurred creating security. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await account.deleteSession("current");
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      throw new Error("An error occurred. Please try again later.");
    }
  };

 

  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      try {
        const res = await account.get();
        setCurrentUser(res);
        await getUser();
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const context: AuthContextType = {
    user,
    currentUser,
    sendOTP,
    verifyOTP,
    isCheckingAuth,
    loading,
    createSecurity,
    logout,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
