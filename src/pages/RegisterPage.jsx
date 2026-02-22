import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiCheck } from 'react-icons/fi';
import PublicLayout from '../components/layout/PublicLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setStep(2);
    setIsLoading(false);
  };

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const result = await register({
        email: formData.email,
        password: formData.password,
        name: formData.name
      });
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
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
              Create Account
            </h1>
            <p className="text-gray-400">Join us to discover amazing events</p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-8"
          >
            {[1, 2].map((s) => (
              <motion.div
                key={s}
                className={`h-2 rounded-full transition-all ${s <= step ? 'bg-primary w-8' : 'bg-gray-700 w-2'}`}
                animate={{ width: s <= step ? 32 : 8 }}
              />
            ))}
          </motion.div>

          {/* Form Card */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="glass-card p-8 rounded-2xl space-y-6"
          >
            {step === 1 ? (
              <>
                {/* Name Field */}
                <motion.div
                  variants={itemVariants}
                  className="relative group"
                >
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-4 text-primary" size={20} />
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                      whileFocus={{ borderColor: '#38bdf8' }}
                    />
                  </div>
                </motion.div>

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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                      whileFocus={{ borderColor: '#38bdf8' }}
                    />
                  </div>
                </motion.div>

                {/* Next Button */}
                <motion.button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email || isLoading}
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
                      Continue <FiArrowRight />
                    </>
                  )}
                </motion.button>
              </>
            ) : (
              <>
                {/* Password Field */}
                <motion.div
                  variants={itemVariants}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-4 text-primary" size={20} />
                    <motion.input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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

                {/* Confirm Password Field */}
                <motion.div
                  variants={itemVariants}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Confirm Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-4 text-primary" size={20} />
                    <motion.input
                      type={showConfirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                      whileFocus={{ borderColor: '#38bdf8' }}
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-primary transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Terms Checkbox */}
                <motion.label
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <input type="checkbox" className="rounded mt-1" />
                  <span className="text-sm text-gray-400">
                    I agree to the <a href="#" className="text-primary hover:text-secondary">Terms of Service</a> and <a href="#" className="text-primary hover:text-secondary">Privacy Policy</a>
                  </span>
                </motion.label>

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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
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
                      Create Account <FiCheck />
                    </>
                  )}
                </motion.button>
              </>
            )}

            {/* Sign In Link */}
            <motion.p
              variants={itemVariants}
              className="text-center text-gray-400 text-sm"
            >
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:text-secondary transition-colors">
                Sign in
              </Link>
            </motion.p>
          </motion.form>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
