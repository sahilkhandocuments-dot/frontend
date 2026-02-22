import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0f172a' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="mb-8"
            >
              <FiAlertTriangle className="text-red-500 mx-auto" size={80} />
            </motion.div>

            <h1 className="text-4xl font-bold mb-4 text-white">Oops! Something Went Wrong</h1>
            <p className="text-gray-400 mb-8">
              We encountered an unexpected error. Don't worry, we're on it!
            </p>

            {import.meta.env.DEV && this.state.error && (
              <motion.details
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-4 rounded-lg mb-8 text-left"
              >
                <summary className="cursor-pointer font-semibold mb-2 text-red-400">
                  Error Details (Dev Only)
                </summary>
                <pre className="text-xs text-gray-300 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </motion.details>
            )}

            <div className="flex flex-col gap-3">
              <motion.button
                onClick={this.handleReset}
                className="bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHome /> Go to Homepage
              </motion.button>
              <motion.button
                onClick={() => window.location.reload()}
                className="border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiRefreshCw /> Reload Page
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
