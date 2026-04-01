import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "./Loading";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};
