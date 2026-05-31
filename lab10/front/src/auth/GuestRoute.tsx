import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Завантаження</p>;
  }
  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
