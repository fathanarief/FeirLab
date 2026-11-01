import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({ adminOnly = false }) {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("user_role")?.toLowerCase();
  const validRole = ["admin", "staff"].includes(role);

  if (!token || !validRole) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email");
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== "admin") {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}
