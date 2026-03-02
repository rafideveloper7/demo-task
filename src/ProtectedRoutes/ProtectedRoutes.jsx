import { useContext } from 'react';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';



function ProtectedRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);


  if (isAuthenticated === undefined) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;