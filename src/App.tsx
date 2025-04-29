import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Home } from '@/Pages/Main'
import { ScrollToTop } from '@/Components/UI'
import { Email, OTP } from './Pages/Auth'
const App = () => {
  return (
    <>
    <Toaster />
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<OTP />} />
        <Route path="/register" element={<Email />} />
      </Routes>
    </>
  )
}

export default App