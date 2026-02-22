import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';
import FestivalManagement from './pages/admin/FestivalManagement';
import Reports from './pages/admin/Reports';
import ResourceManagement from './pages/admin/ResourceManagement';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/analytics" element={<Analytics />} />
      <Route path="/admin/events" element={<FestivalManagement />} />
      <Route path="/admin/reports" element={<Reports />} />
      <Route path="/admin/resources" element={<ResourceManagement />} />
      <Route path="/admin/system" element={<Analytics />} />
    </Routes>
  );
}

export default App;
