import { useLocation } from "react-router-dom";
import { Goback, ThemeToggle } from "../UI";

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  return (
    <>
      <header className="layout sticky top-0 backdrop-blur-md z-50">
          <nav className="h-[80px]  flex items-center justify-between">
            {isDashboard ? (
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/9.x/identicon/svg?seed=Jacksun`}
                    alt=""
                    className="w-8 object-cover h-8"
                  />
                </div>
                <h3 className="font-sora text-lg font-medium">Jacksun</h3>
              </div>
            ) : (
              <Goback />
            )}
            <ThemeToggle />
          </nav>
      </header>
    </>
  );
};

export default Header;
