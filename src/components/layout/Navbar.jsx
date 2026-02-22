import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function Navbar(){
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const navItems = [
    { to: '/', label: 'Discover' },
    { to: '/submit', label: 'Submit' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300 } }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="py-4 border-b border-gray-800 glass-card sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="text-2xl font-extrabold bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(90deg,#38bdf8,#fbbf24)'}}>
            EventX
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              className={({isActive})=>`underline-slide relative font-medium transition-colors ${isActive? 'text-primary':'text-gray-200'}`}
            >
              {item.label}
            </NavLink>
          ))}
          
          {/* Authentication Section */}
          {loading ? (
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          ) : isAuthenticated && user ? (
            <div className="relative">
              <motion.button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.full_name ? user.full_name.charAt(0) : user.email.charAt(0)}
                </div>
                <span className="text-gray-200 font-medium">{user.full_name || user.email}</span>
              </motion.button>
              
              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
                  >
                    <Link 
                      to="/dashboard" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-gray-200 hover:bg-gray-700 transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-3 text-gray-200 hover:bg-gray-700 transition-colors w-full text-left"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : !loading && (
            <div className="flex items-center space-x-4">
              <motion.button 
                onClick={() => navigate('/login')}
                className="text-gray-200 hover:text-white transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button 
                onClick={() => navigate('/register')}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button 
            onClick={() => setOpen(v => !v)} 
            className="p-2 rounded hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                  <FiX size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                  <FiMenu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2 bg-gradient-to-b from-white/5 to-transparent">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.to}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: idx * 0.1 }}
                >
                  <NavLink 
                    to={item.to} 
                    onClick={() => setOpen(false)} 
                    className={({isActive})=>`block py-3 px-3 rounded-lg transition-all ${isActive ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-white/5'}`}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              
              {/* Mobile Authentication */}
              {user ? (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.full_name ? user.full_name.charAt(0) : user.email.charAt(0)}
                    </div>
                    <span className="text-gray-200 font-medium">{user.full_name || user.email}</span>
                  </div>
                  <motion.button
                    onClick={() => {
                      setOpen(false);
                      navigate('/dashboard');
                    }}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full text-left py-3 px-3 rounded-lg text-gray-300 hover:bg-white/5 transition-all"
                  >
                    Dashboard
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full text-left py-3 px-3 rounded-lg text-gray-300 hover:bg-white/5 transition-all"
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                  <motion.button
                    onClick={() => {
                      setOpen(false);
                      navigate('/login');
                    }}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full btn-secondary"
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setOpen(false);
                      navigate('/register');
                    }}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full btn-primary"
                  >
                    Sign Up
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
