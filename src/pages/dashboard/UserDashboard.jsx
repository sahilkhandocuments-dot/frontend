import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCalendar, 
  FiUser, 
  FiTrendingUp, 
  FiBookmark,
  FiSettings,
  FiHeart,
  FiClock,
  FiMapPin,
  FiPlus
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { mockEvents } from '../../data/mockData';

function UserDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    registeredEvents: 0,
    upcomingEvents: 0,
    favoriteEvents: 0,
    completedEvents: 0
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock events
        const events = mockEvents;
        
        // Mock some statistics
        setStats({
          registeredEvents: 5,
          upcomingEvents: events.filter(e => new Date(e.start_date) > new Date()).length,
          favoriteEvents: 3,
          completedEvents: 8
        });
        
        setRecentEvents(events.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Registered Events',
      value: stats.registeredEvents,
      icon: FiCalendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: FiClock,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Favorite Events',
      value: stats.favoriteEvents,
      icon: FiHeart,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      iconColor: 'text-pink-600 dark:text-pink-400'
    },
    {
      title: 'Completed',
      value: stats.completedEvents,
      icon: FiTrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const quickActions = [
    {
      title: 'Browse Events',
      description: 'Discover new events',
      icon: FiCalendar,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      action: () => window.location.href = '/'
    },
    {
      title: 'My Profile',
      description: 'Manage your profile',
      icon: FiUser,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      action: () => console.log('Profile clicked')
    },
    {
      title: 'Settings',
      description: 'Account settings',
      icon: FiSettings,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      action: () => console.log('Settings clicked')
    }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.full_name || 'User'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your events today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.iconColor}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Events */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Events
                </h2>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <FiCalendar className="text-white w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <FiMapPin className="w-4 h-4 mr-1" />
                        {event.location}
                        <FiClock className="w-4 h-4 ml-3 mr-1" />
                        {new Date(event.start_date).toLocaleDateString()}
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                      {event.status}
                    </span>
                  </motion.div>
                ))}
                
                {recentEvents.length === 0 && (
                  <div className="text-center py-8">
                    <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">No events found</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={action.action}
                    className="w-full flex items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors group"
                  >
                    <div className={`p-3 rounded-lg ${action.color} mr-4`}>
                      <action.icon className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <FiUser className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Profile Completion</h3>
                  <p className="text-sm opacity-80">Complete your profile</p>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm opacity-80">75% Complete</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
