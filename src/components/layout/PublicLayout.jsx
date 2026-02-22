import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NotificationContainer from '../common/NotificationContainer';
import { useTheme } from '../../context/ThemeContext';

const PublicLayout = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -z-10" />
      
      {/* Navbar for public pages */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Notification Container */}
      <NotificationContainer />
    </div>
  );
};

export default PublicLayout;
