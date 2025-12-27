import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/Slice";

interface ProtectedRouteProps {
  allowedRoles?: string[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { state } = useContext(AuthContext);

  
  if (!state.token) {
    return <Navigate to="/about" replace />;
  }

  
  if (!state.user) {
    return <div>טוען...</div>;
  }
  

  // בודק אם יש הגבלת תפקידים
  if (allowedRoles && !allowedRoles.includes(state.user.role)) {
    return <Navigate to="/unauthorized" replace />; 
  }

  
  return <Outlet />;
};

export default ProtectedRoute;