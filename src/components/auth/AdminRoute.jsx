import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSkeleton from '../common/LoadingSkeleton';

const AdminRoute = ({ children, redirectTo = '/dashboard' }) => {
  const { isAuthenticated, loading, isAdmin } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect if not admin
  if (!isAdmin()) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default AdminRoute;