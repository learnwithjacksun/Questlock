import { AuthContext } from "@/Context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider!");
  }

  return { ...context };
};

export default useAuth;
