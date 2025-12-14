import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; 



function ProtectedRoute({ children, role }) {
  const { token, role: userRole } = useContext(AuthContext);
  const location = useLocation();

  // Not logged in so send to login
  if (!token) 
    return <Navigate to="/login" replace state={{ from: location }} />;

  // Role required so need to check match
  if (role && userRole !== role) 
    return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;