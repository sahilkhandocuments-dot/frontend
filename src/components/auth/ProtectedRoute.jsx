import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSkeleton from '../common/LoadingSkeleton';

const ProtectedRoute = ({ children, role = null, redirectTo = '/login' }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role if specified
  if (role && user?.role !== role) {
    // If user doesn't have the required role, redirect to their appropriate dashboard
    const dashboardMap = {
      admin: '/admin/dashboard',
      organizer: '/organizer/dashboard',
      participant: '/dashboard',
    };

    const userDashboard = dashboardMap[user?.role] || '/dashboard';
    return <Navigate to={userDashboard} replace />;
  }

  return children;
};

export default ProtectedRoute;