import { Routes, Route, Navigate } from "react-router-dom";
import Bugs from "./pages/Bugs";
import CreateBug from "./pages/CreateBug";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { useUser } from "./context/UserContext";

function App() {
  const { user } = useUser();

  return (
    <Routes>
      {/* Smart redirect for / */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        }
      />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Pages */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bugs" element={<Bugs />} />
        <Route path="/users" element={<ProtectedRoute role="admin"><Users /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute role="admin"><CreateBug /></ProtectedRoute>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<div className="text-red-500 text-xl font-bold">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
