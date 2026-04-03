import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// this protects routes so only logged-in users can access them
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // get auth state

  if (loading) return <p>Loading...</p>; // wait until auth check finishes
  // if no user, redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  // if logged in, allow access to the page
  return children;
};

export default ProtectedRoute;
