import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Goback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authRoutes = ["/auth", "/verify", "/passcode", "/security"];
  const isAuthRoute = authRoutes.includes(location.pathname);

  const handleBack = () => {
    if (isAuthRoute) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={handleBack} className="center">
      <ArrowLeft size={24} />
    </button>
  );
};

export default Goback;
