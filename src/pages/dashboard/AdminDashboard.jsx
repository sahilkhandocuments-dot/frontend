import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiUsers, 
  FiCalendar, 
  FiTrendingUp, 
  FiDollarSign,
  FiSettings,
  FiShield,
  FiBarChart,
  FiActivity,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiCheck,
  FiX,
  FiAlertTriangle,
  FiRefreshCw,
  FiDownload,
  FiUserX,
  FiUserCheck
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { mockEvents, mockUsers, mockStats, mockRecentActivity } from '../../data/mockData';

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalRevenue: 0,
    activeUsers: 0,
    pendingEvents: 0,
    systemHealth: 'good'
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock data
        setStats(mockStats);
        setRecentEvents(mockEvents.slice(0, 5));
        setRecentUsers(mockUsers);

        // System alerts for admin monitoring
        setSystemAlerts([
          { id: 1, type: 'warning', message: 'High server load detected', time: '5 min ago' },
          { id: 2, type: 'info', message: 'Database backup completed', time: '1 hour ago' },
          { id: 3, type: 'error', message: '2 failed login attempts detected', time: '2 hours ago' }
        ]);
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      change: '+12%'
    },
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: FiCalendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      change: '+8%'
    },
    {
      title: 'Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      change: '+15%'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: FiActivity,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
      change: '+5%'
    },
    {
      title: 'Pending Events',
      value: stats.pendingEvents,
      icon: FiAlertTriangle,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      change: stats.pendingEvents > 0 ? 'Needs review' : 'All clear'
    },
    {
      title: 'System Health',
      value: stats.systemHealth.toUpperCase(),
      icon: FiShield,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      change: '99.9% uptime'
    }
  ];

  const quickActions = [
    {
      title: 'Create Event',
      description: 'Add a new event',
      icon: FiPlus,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      action: () => navigate('/admin/events/create')
    },
    {
      title: 'Manage Users',
      description: 'User management',
      icon: FiUsers,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      action: () => navigate('/admin/users')
    },
    {
      title: 'Analytics',
      description: 'View detailed analytics',
      icon: FiBarChart,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      action: () => navigate('/admin/analytics')
    },
    {
      title: 'System Settings',
      description: 'Configure system',
      icon: FiSettings,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      action: () => navigate('/admin/settings')
    },
    {
      title: 'Export Data',
      description: 'Download reports',
      icon: FiDownload,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      action: () => handleExportData()
    },
    {
      title: 'Refresh Data',
      description: 'Update dashboard',
      icon: FiRefreshCw,
      color: 'bg-gradient-to-r from-gray-500 to-gray-600',
      action: () => window.location.reload()
    }
  ];

  // Admin action handlers
  const handleUserAction = async (userId, action) => {
    setActionLoading(prev => ({ ...prev, [`user_${userId}`]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user status locally
      setRecentUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: action === 'approve' ? 'active' : action === 'suspend' ? 'suspended' : user.status }
          : user
      ));
      
      console.log(`${action} user ${userId}`);
    } catch (error) {
      console.error('Error performing user action:', error);
    } finally {
      setActionLoading(prev => ({ ...prev, [`user_${userId}`]: false }));
    }
  };

  const handleEventAction = async (eventId, action) => {
    setActionLoading(prev => ({ ...prev, [`event_${eventId}`]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (action === 'delete') {
        setRecentEvents(prev => prev.filter(event => event.id !== eventId));
      }
      
      console.log(`${action} event ${eventId}`);
    } catch (error) {
      console.error('Error performing event action:', error);
    } finally {
      setActionLoading(prev => ({ ...prev, [`event_${eventId}`]: false }));
    }
  };

  const handleExportData = () => {
    // Create CSV data
    const csvData = [
      ['Event Title', 'Location', 'Price', 'Category'],
      ...recentEvents.map(event => [event.title, event.location, event.price || 0, event.category])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'events_export.csv');
    a.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <FiShield className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.full_name || 'Admin'}. Here's your system overview.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${stat.iconColor}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${
                  stat.title === 'Pending Events' && stats.pendingEvents > 0
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={action.action}
                className="flex flex-col items-center p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 group"
              >
                <div className={`p-4 rounded-2xl ${action.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Events */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Events
                </h2>
                <button 
                  onClick={() => navigate('/admin/events')}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium"
                >
                  Manage All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentEvents.map((event, index) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <FiCalendar className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {event.location} • ${event.price || 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="View Event"
                      >
                        <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button 
                        onClick={() => navigate(`/admin/events/${event.id}/edit`)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="Edit Event"
                      >
                        <FiEdit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button 
                        onClick={() => handleEventAction(event.id, 'delete')}
                        disabled={actionLoading[`event_${event.id}`]}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete Event"
                      >
                        {actionLoading[`event_${event.id}`] ? (
                          <FiRefreshCw className="w-4 h-4 text-red-600 dark:text-red-400 animate-spin" />
                        ) : (
                          <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Users & Alerts Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Recent Users */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Users
                </h2>
                <button 
                  onClick={() => navigate('/admin/users')}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium"
                >
                  Manage All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentUsers.map((user, index) => (
                  <div key={user.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-3 text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {user.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : user.role === 'organizer'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {user.role}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : user.status === 'suspended'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Joined: {user.joinedDate} • Last: {user.lastLogin}
                      </div>
                      <div className="flex items-center space-x-1">
                        {user.status === 'pending' && (
                          <button
                            onClick={() => handleUserAction(user.id, 'approve')}
                            disabled={actionLoading[`user_${user.id}`]}
                            className="p-1 hover:bg-green-100 dark:hover:bg-green-900/20 rounded transition-colors disabled:opacity-50"
                            title="Approve User"
                          >
                            {actionLoading[`user_${user.id}`] ? (
                              <FiRefreshCw className="w-3 h-3 text-green-600 animate-spin" />
                            ) : (
                              <FiUserCheck className="w-3 h-3 text-green-600" />
                            )}
                          </button>
                        )}
                        {user.status === 'active' && (
                          <button
                            onClick={() => handleUserAction(user.id, 'suspend')}
                            disabled={actionLoading[`user_${user.id}`]}
                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                            title="Suspend User"
                          >
                            {actionLoading[`user_${user.id}`] ? (
                              <FiRefreshCw className="w-3 h-3 text-red-600 animate-spin" />
                            ) : (
                              <FiUserX className="w-3 h-3 text-red-600" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  System Alerts
                </h2>
                <button 
                  onClick={() => navigate('/admin/system')}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium"
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-3">
                {systemAlerts.map((alert, index) => (
                  <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                    alert.type === 'error' 
                      ? 'bg-red-50 border-red-400 dark:bg-red-900/20'
                      : alert.type === 'warning'
                      ? 'bg-yellow-50 border-yellow-400 dark:bg-yellow-900/20'
                      : 'bg-blue-50 border-blue-400 dark:bg-blue-900/20'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          alert.type === 'error' 
                            ? 'text-red-800 dark:text-red-400'
                            : alert.type === 'warning'
                            ? 'text-yellow-800 dark:text-yellow-400'
                            : 'text-blue-800 dark:text-blue-400'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {alert.time}
                        </p>
                      </div>
                      <FiAlertTriangle className={`w-4 h-4 ml-2 ${
                        alert.type === 'error' 
                          ? 'text-red-600'
                          : alert.type === 'warning'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
