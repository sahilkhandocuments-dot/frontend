import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiAlertTriangle, FiInfo, FiAlertCircle } from 'react-icons/fi';
import { useNotifications, NOTIFICATION_TYPES } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';

const NotificationContainer = () => {
  const { notifications, removeNotification, settings } = useNotifications();
  const { animations } = useTheme();

  const getIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return FiCheck;
      case NOTIFICATION_TYPES.ERROR:
        return FiAlertCircle;
      case NOTIFICATION_TYPES.WARNING:
        return FiAlertTriangle;
      case NOTIFICATION_TYPES.INFO:
      default:
        return FiInfo;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return {
          bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
          icon: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/30',
          title: 'text-green-900 dark:text-green-100',
          message: 'text-green-700 dark:text-green-300',
        };
      case NOTIFICATION_TYPES.ERROR:
        return {
          bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
          icon: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-800/30',
          title: 'text-red-900 dark:text-red-100',
          message: 'text-red-700 dark:text-red-300',
        };
      case NOTIFICATION_TYPES.WARNING:
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
          icon: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-800/30',
          title: 'text-yellow-900 dark:text-yellow-100',
          message: 'text-yellow-700 dark:text-yellow-300',
        };
      case NOTIFICATION_TYPES.INFO:
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          icon: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800/30',
          title: 'text-blue-900 dark:text-blue-100',
          message: 'text-blue-700 dark:text-blue-300',
        };
    }
  };

  const getPositionClasses = (position) => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
      default:
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
    }
  };

  if (!notifications.length) return null;

  return (
    <div 
      className={`fixed z-50 ${getPositionClasses(settings.position)} max-w-sm w-full`}
      style={{ maxHeight: '80vh' }}
    >
      <div className="space-y-2 overflow-hidden">
        <AnimatePresence>
          {notifications.slice(0, settings.maxNotifications).map((notification) => {
            const Icon = getIcon(notification.type);
            const styles = getStyles(notification.type);
            
            return (
              <motion.div
                key={notification.id}
                initial={animations ? { opacity: 0, y: -50, scale: 0.95 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={animations ? { opacity: 0, y: -50, scale: 0.95 } : false}
                transition={{ duration: animations ? 0.3 : 0, ease: "easeOut" }}
                className={`
                  relative p-4 rounded-lg border shadow-lg backdrop-blur-sm
                  ${styles.bg}
                  max-w-full
                `}
                onMouseEnter={() => {
                  // Pause auto-dismiss on hover if enabled
                  if (settings.pauseOnHover && notification.timeoutId) {
                    clearTimeout(notification.timeoutId);
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${styles.icon}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {notification.title && (
                      <p className={`text-sm font-semibold ${styles.title}`}>
                        {notification.title}
                      </p>
                    )}
                    <p className={`text-sm ${styles.message} ${notification.title ? 'mt-1' : ''}`}>
                      {notification.message}
                    </p>
                    
                    {/* Actions */}
                    {notification.actions && notification.actions.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {notification.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={action.onClick}
                            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${styles.actionButton}`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className={`flex-shrink-0 p-1 rounded-md transition-colors ${styles.message} hover:bg-black/10 dark:hover:bg-white/10`}
                    aria-label="Close notification"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress bar */}
                {notification.duration > 0 && settings.showProgress && (
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: notification.duration / 1000, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg"
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationContainer;