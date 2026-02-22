import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiArrowRight } from 'react-icons/fi';
import PublicLayout from '../components/layout/PublicLayout';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring' } }
  };

  const floatingVariants = {
    float: {
      y: [-20, 20, -20],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-md"
        >
          {/* 404 Text with Animation */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.h1
              className="text-9xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              404
            </motion.h1>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-3"
          >
            Page Not Found
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 mb-8 text-lg"
          >
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </motion.p>

          {/* Animated Illustration */}
          <motion.div
            variants={itemVariants}
            animate="float"
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center text-4xl">
              🔍
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3"
          >
            <Link to="/">
              <motion.button
                className="w-full bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(56,189,248,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHome /> Back to Home
              </motion.button>
            </Link>
            <Link to="/">
              <motion.button
                className="w-full border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Events <FiArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
