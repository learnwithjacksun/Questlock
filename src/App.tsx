import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Home } from '@/Pages/Main'
import { ScrollToTop } from '@/Components/UI'
import { Email, OTP, Passcode } from './Pages/Auth'
import { Dashboard, ItemDetails } from './Pages/Dashboard'
const App = () => {
  return (
    <>
    <Toaster />
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<OTP />} />
        <Route path="/auth" element={<Email />} />
        <Route path="/passcode" element={<Passcode />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details" element={<ItemDetails/>} />
      </Routes>
    </>
  )
}

export default App