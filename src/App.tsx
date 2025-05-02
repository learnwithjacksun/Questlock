import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Home } from "@/Pages/Main";
import { ScrollToTop } from "@/Components/UI";
import { Email, OTP, Passcode, Recovery, Security } from "./Pages/Auth";
import { Dashboard, ItemDetails } from "./Pages/Dashboard";
import Protector from "./Pages/Protector";
import { AuthProvider, DataProvider } from "./Context";
const App = () => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <ScrollToTop />
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<OTP />} />
            <Route path="/auth" element={<Email />} />
            <Route path="/security" element={<Security />} />
            <Route path="/recovery" element={<Recovery />} />
            <Route element={<Protector />}>
              <Route path="/passcode" element={<Passcode />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/details" element={<ItemDetails />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </>
  );
};

export default App;
