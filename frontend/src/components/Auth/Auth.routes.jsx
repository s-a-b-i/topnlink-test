// src/components/Auth/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;