import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { Button } from "./atoms/Button";
import { NavIndicator } from "./atoms/NavIndicator";
import { UserAvatar } from "./atoms/UserAvatar";
import { ArrowRightFromSquare, Bars, Xmark } from "@gravity-ui/icons";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Función para determinar si una ruta está activa
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Función para obtener label de la ruta activa
  const getActiveRouteLabel = () => {
    const routeLabels: Record<string, string> = {
      "/home": "Dashboard",
      "/my-team": "Mi Equipo",
      "/my-league": "Mi Liga",
      "/profile": "Mi Perfil",
    };
    return routeLabels[location.pathname] || "Dashboard";
  };

  const navItems = [
    { path: "/home", label: "Dashboard", icon: "📊" },
    { path: "/my-team", label: "Mi Equipo", icon: "👥" },
    { path: "/my-league", label: "Mi Liga", icon: "🏆" },
  ];

  return (
    <nav className="bg-surface border-b border-border shadow-lg sticky top-0 z-50">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Main Navbar Header */}
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo and Brand - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-8 flex-shrink-0">
            <div
              className="flex items-center gap-1 sm:gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition"
              onClick={() => navigate("/home")}
            >
              <img
                src="/soccer-ball-icon.png"
                alt="Futbol Manager"
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-contain"
              />
              <h1 className="hidden sm:block text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                Futbol Manager
              </h1>
            </div>
          </div>

          {/* Center: Navigation Links - Desktop Only */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {navItems.map((item) => (
              <NavIndicator
                key={item.path}
                label={item.label}
                icon={item.icon}
                onClick={() => handleNavigation(item.path)}
                isActive={isActive(item.path)}
              />
            ))}
          </div>

          {/* Right: User Info and Actions - Order: Theme, Avatar, Menu */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* User Avatar - Responsive */}
            <button
              onClick={() => navigate("/profile")}
              className="transition active:scale-95"
              aria-label="Go to profile"
            >
              <UserAvatar
                firstName={user?.firstName}
                lastName={user?.lastName}
                isButton={true}
              />
            </button>

            {/* Theme Switch */}
            <ThemeSwitch />

            {/* Desktop Logout Button */}
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex"
              ariaLabel="Logout"
            >
              <ArrowRightFromSquare className="size-5 text-danger hover:text-danger/80 transition" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
              ariaLabel="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <Xmark className="size-5" />
              ) : (
                <Bars className="size-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile: Navigation Menu - Collapsed/Expanded */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-3 space-y-2 animate-in fade-in slide-in-from-top-2">
            {/* Mobile Active Route Indicator */}
            <div className="px-2">
              <NavIndicator
                label={getActiveRouteLabel()}
                isActive={true}
                className="w-full justify-center bg-accent/20 border-accent/50"
              />
            </div>

            {/* Mobile Navigation Items */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                    font-medium text-base transition duration-200
                    cursor-pointer select-none active:scale-95
                    ${
                      isActive(item.path)
                        ? "bg-accent/20 text-accent border border-accent/50"
                        : "text-foreground border border-transparent hover:border-accent/50 hover:text-accent bg-surface-secondary"
                    }
                  `}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="flex-grow text-left">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Profile Link */}
            <button
              onClick={() => handleNavigation("/profile")}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                font-medium text-base transition duration-200
                cursor-pointer select-none active:scale-95
                ${
                  isActive("/profile")
                    ? "bg-accent/20 text-accent border border-accent/50"
                    : "text-foreground border border-transparent hover:border-accent/50 hover:text-accent bg-surface-secondary"
                }
              `}
            >
              <span className="text-xl flex-shrink-0">👤</span>
              <span className="flex-grow text-left">Mi Perfil</span>
            </button>

            {/* Separator */}
            <div className="border-t border-border my-3" />

            {/* Logout Button - Separated at bottom */}
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                font-medium text-base transition duration-200
                cursor-pointer select-none active:scale-95
                text-danger border border-transparent
                hover:border-danger/50 hover:bg-danger/10
                bg-surface-secondary
              `}
            >
              <span className="text-xl flex-shrink-0">
                <ArrowRightFromSquare className="size-5" />
              </span>
              <span className="flex-grow text-left">Cerrar Sesión</span>
            </button>
          </div>
        )}

        {/* Mobile: Bottom Breadcrumb - Solo visible en mobile */}
        {!isMobileMenuOpen && (
          <div className="md:hidden flex items-center justify-center gap-2 -mx-3 px-3 pb-2 text-xs text-muted">
            <span>📍</span>
            <span className="font-medium">{getActiveRouteLabel()}</span>
          </div>
        )}
      </div>
    </nav>
  );
};