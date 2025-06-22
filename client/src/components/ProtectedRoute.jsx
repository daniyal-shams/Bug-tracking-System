import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function ProtectedRoute({ children, role }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;
  return children;
}
