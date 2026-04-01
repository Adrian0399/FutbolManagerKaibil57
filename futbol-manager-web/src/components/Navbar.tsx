import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ThemeSwitch } from "./ThemeSwitch";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-surface text-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Futbol Manager</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Bienvenido,{" "}
              <span className="font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
            </span>
            <ThemeSwitch />
            <button
              onClick={handleLogout}
              className="bg-danger hover:bg-danger-hover text-danger-foreground px-4 py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
