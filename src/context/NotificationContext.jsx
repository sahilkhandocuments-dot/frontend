import React, { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Notification reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    case 'CLEAR_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };
    case 'UPDATE_NOTIFICATION_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  notifications: [],
  settings: {
    position: 'top-right',
    duration: 5000,
    maxNotifications: 5,
    showProgress: true,
    soundEnabled: false,
    pauseOnHover: true,
  },
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Add notification
  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: NOTIFICATION_TYPES.INFO,
      duration: state.settings.duration,
      ...notification,
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });

    // Auto-remove notification if duration is set
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  // Remove notification
  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  // Clear all notifications
  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' });
  };

  // Convenience methods for different types
  const success = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.SUCCESS,
      title: 'Success',
      message,
      ...options,
    });
  };

  const error = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.ERROR,
      title: 'Error',
      message,
      duration: 0, // Don't auto-remove error notifications
      ...options,
    });
  };

  const warning = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.WARNING,
      title: 'Warning',
      message,
      ...options,
    });
  };

  const info = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.INFO,
      title: 'Info',
      message,
      ...options,
    });
  };

  // Update settings
  const updateSettings = (newSettings) => {
    dispatch({ type: 'UPDATE_NOTIFICATION_SETTINGS', payload: newSettings });
  };

  // API request notifications
  const notifyApiSuccess = (action, data) => {
    const messages = {
      create: 'Created successfully!',
      update: 'Updated successfully!',
      delete: 'Deleted successfully!',
      register: 'Registration successful!',
      login: 'Logged in successfully!',
      logout: 'Logged out successfully!',
    };

    return success(data?.message || messages[action] || 'Operation successful!');
  };

  const notifyApiError = (error, action) => {
    let message = 'Something went wrong. Please try again.';
    
    if (error?.response?.data?.detail) {
      message = error.response.data.detail;
    } else if (error?.response?.data?.message) {
      message = error.response.data.message;
    } else if (error?.message) {
      message = error.message;
    }

    const actionMessages = {
      create: 'Failed to create',
      update: 'Failed to update',
      delete: 'Failed to delete',
      register: 'Registration failed',
      login: 'Login failed',
      fetch: 'Failed to load data',
    };

    const title = actionMessages[action] || 'Error';

    return error(message, { title });
  };

  const value = {
    notifications: state.notifications,
    settings: state.settings,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
    updateSettings,
    notifyApiSuccess,
    notifyApiError,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;