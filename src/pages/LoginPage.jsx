import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import PublicLayout from '../components/layout/PublicLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await login({ email, password });
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </motion.div>

          {/* Form Card */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="glass-card p-8 rounded-2xl space-y-6"
          >
            {/* Email Field */}
            <motion.div
              variants={itemVariants}
              className="relative group"
            >
              <label className="block text-sm font-semibold mb-2 text-gray-300">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-4 text-primary" size={20} />
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  whileFocus={{ borderColor: '#38bdf8' }}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              variants={itemVariants}
              className="relative group"
            >
              <label className="block text-sm font-semibold mb-2 text-gray-300">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-4 text-primary" size={20} />
                <motion.input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  whileFocus={{ borderColor: '#38bdf8' }}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </motion.button>
              </div>
            </motion.div>

            {/* Remember & Forgot */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between text-sm"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:text-secondary transition-colors">
                Forgot password?
              </a>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm"
              >
                {typeof error === 'string' ? error : 'An error occurred. Please try again.'}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              variants={itemVariants}
              className="w-full bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Sign In <FiArrowRight />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-gray-900 bg-gradient-to-b from-gray-900 to-gray-800">Or</span>
              </div>
            </motion.div>

            {/* Social Login */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3"
            >
              <motion.button
                type="button"
                className="border border-gray-700 rounded-lg py-2 hover:bg-gray-900 transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Google
              </motion.button>
              <motion.button
                type="button"
                className="border border-gray-700 rounded-lg py-2 hover:bg-gray-900 transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub
              </motion.button>
            </motion.div>

            {/* Sign Up Link */}
            <motion.p
              variants={itemVariants}
              className="text-center text-gray-400"
            >
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:text-secondary transition-colors">
                Sign up
              </Link>
            </motion.p>
          </motion.form>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
