import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Home } from "@/Pages/Main";
import { ScrollToTop } from "@/Components/UI";
import { Email, OTP, Passcode } from "./Pages/Auth";
import { Dashboard, ItemDetails } from "./Pages/Dashboard";
import useAuthStore from "./Stores/useAuthStore";
import { useEffect } from "react";
import { account, client, DB, ITEMS, VALUES } from "./Config/appwrite";
import Protector from "./Pages/Protector";
import { useDataStore } from "./Stores";
import { fetchValues, getUserItems } from "./Services/data.service";
const App = () => {
  const { pathname } = useLocation();
  const { fetchUser, setAuthState, setIsCheckingAuth, user } = useAuthStore();
  const { setValues } = useDataStore();
  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      try {
        const user = await account.get();
        if (user) {
          setAuthState(true);
          fetchUser(user.$id);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [fetchUser, setAuthState, setIsCheckingAuth]);

  useEffect(() => {
    const getValues = async () => {
      try {
        const values = await fetchValues();
        setValues(values);
        console.log("Fetched values:", values);
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    };
    getValues();
  }, [pathname, setValues]);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      [
        `databases.${DB}.collections.${ITEMS}.documents`,
        `databases.${DB}.collections.${VALUES}.documents`,
      ],
      (response) => {
        if (response.events.some((event) => event.includes("create") || event.includes("update") || event.includes("delete"))) {

          getUserItems(user?.$id);
          fetchValues();
        }
      }
    );

    return () => unsubscribe();
  }, [user?.$id, getUserItems, fetchValues]);

  return (
    <>
      <Toaster position="top-center" richColors />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<OTP />} />
        <Route path="/auth" element={<Email />} />
        <Route element={<Protector />}>
          <Route path="/passcode" element={<Passcode />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details" element={<ItemDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
