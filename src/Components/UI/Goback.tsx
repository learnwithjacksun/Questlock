import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Goback = () => {
    const navigate = useNavigate()
  return (
    <>
    <button onClick={()=> navigate(-1)} className="center h-10 w-10 rounded-full border border-line">
        <ArrowLeft size={20}/>
    </button>
    </>
  )
}

export default Goback