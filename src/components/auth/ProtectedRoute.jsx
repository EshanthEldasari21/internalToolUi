import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!isAuthenticated || !userData) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}