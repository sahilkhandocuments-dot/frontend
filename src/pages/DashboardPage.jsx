import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import UserDashboard from './dashboard/UserDashboard';
import OrganizerDashboard from './dashboard/OrganizerDashboard';  
import AdminDashboard from './dashboard/AdminDashboard';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'organizer':
        return <OrganizerDashboard />;
      case 'user':
      default:
        return <UserDashboard />;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
}

export default DashboardPage;