import { Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { MyTeamPage } from "./pages/MyTeamPage/MyTeamPage";
import { MyLeaguePage } from "./pages/MyLeaguePage/MyLeaguePage";
import { RegisterPage } from "./pages/RegisterPage";

export const routes = [
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-team",
    element: (
      <ProtectedRoute>
        <MyTeamPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-league",
    element: (
      <ProtectedRoute>
        <MyLeaguePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
];
