import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Home } from '@/Pages/Main'
import { ScrollToTop } from '@/Components/UI'
const App = () => {
  return (
    <>
    <Toaster />
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App