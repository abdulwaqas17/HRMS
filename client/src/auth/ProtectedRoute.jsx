// src/auth/ProtectedRoute.jsx
import { isTokenValid } from "@/utils/tokenUtils";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children,values }) => {
  const isAuthenticated = isTokenValid(values.token);

  if (!isAuthenticated) {
    return <Navigate to={`/${values.redirect}`} replace />;
  }

  return children;
};

export default ProtectedRoute;

// replace ==> 
// History stack mein current page ko replace kar do, taake user back button dabaye to wapas protected page pe na ja sake |
// Redirect hone ke baad user back kare to wo wapas restricted route pe nahi ja sakega |
// without replace User login page pe redirect hoga, lekin browser ka back button use karke wapas restricted page pe ja sakta hai (temporarily).
