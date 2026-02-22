import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import NotificationContainer from '../common/NotificationContainer';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isDark, animations } = useTheme();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto close sidebar on mobile
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -z-10" />
      
      {/* Header */}
      <Header 
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex flex-1">
        {/* Sidebar - only show for authenticated users */}
        {isAuthenticated && (
          <>
            {/* Mobile overlay */}
            <AnimatePresence>
              {sidebarOpen && isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: animations ? 0.2 : 0 }}
                  className="fixed inset-0 bg-black/50 z-20 md:hidden"
                  onClick={closeSidebar}
                />
              )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
              {(sidebarOpen || !isMobile) && (
                <motion.aside
                  initial={animations ? { x: isMobile ? -280 : 0, opacity: isMobile ? 0 : 1 } : false}
                  animate={{ x: 0, opacity: 1 }}
                  exit={animations ? { x: isMobile ? -280 : 0, opacity: isMobile ? 0 : 1 } : false}
                  transition={{ duration: animations ? 0.3 : 0, ease: "easeInOut" }}
                  className={`
                    ${isMobile ? 'fixed' : 'relative'} 
                    ${isMobile ? 'z-30' : 'z-10'}
                    w-64 
                    ${isMobile ? 'h-screen' : 'min-h-0'}
                    bg-white/80 dark:bg-slate-800/80 
                    backdrop-blur-lg 
                    border-r border-gray-200 dark:border-slate-700
                    shadow-lg
                  `}
                >
                  <Sidebar closeSidebar={closeSidebar} isMobile={isMobile} />
                </motion.aside>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Main content */}
        <main 
          className={`
            flex-1 
            flex 
            flex-col 
            min-h-0
            ${!isAuthenticated ? 'w-full' : ''}
          `}
        >
          {/* Content area */}
          <div className="flex-1 p-4 md:p-6 lg:p-8">
            <motion.div
              initial={animations ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animations ? 0.5 : 0, ease: "easeOut" }}
              className="max-w-7xl mx-auto"
            >
              {children || <Outlet />}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Notification Container */}
      <NotificationContainer />
    </div>
  );
};

export default Layout;
