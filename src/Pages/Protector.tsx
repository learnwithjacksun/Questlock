import useAuthStore from "@/Stores/useAuthStore"
import { Loader2 } from "lucide-react"
import { Navigate, Outlet } from "react-router-dom"

const Protector = () => {
    const {isAuthenticated, isCheckingAuth} = useAuthStore()

    if (isCheckingAuth && !isAuthenticated) return <div className="h-screen w-screen text-semibold font-sora center gap-2"><Loader2 size={20} className="animate-spin text-purple-500"/> Loading...</div>
  return isAuthenticated ? <Outlet/> : <Navigate to="/auth" replace={true} />
}

export default Protector