import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCalendar, 
  FiUsers, 
  FiTrendingUp, 
  FiDollarSign,
  FiPlus,
  FiEdit,
  FiEye,
  FiBarChart,
  FiClock,
  FiMapPin,
  FiSettings,
  FiMic,
  FiStar
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { mockEvents } from '../../data/mockData';

function OrganizerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    upcomingEvents: 0,
    revenue: 0
  });
  const [myEvents, setMyEvents] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizerData = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock events
        const events = mockEvents;
        
        // For demo, assume organizer created some events
        const organizerEvents = events.slice(0, 3);
        setMyEvents(organizerEvents);
        
        // Mock organizer statistics
        setStats({
          totalEvents: organizerEvents.length,
          totalRegistrations: 127,
          upcomingEvents: organizerEvents.length,
          revenue: 3250
        });
        
        // Mock recent registrations
        setRecentRegistrations([
          { id: 1, eventName: 'Tech Conference 2024', userName: 'John Doe', date: '2 hours ago', status: 'confirmed' },
          { id: 2, eventName: 'Art Workshop', userName: 'Jane Smith', date: '4 hours ago', status: 'pending' },
          { id: 3, eventName: 'Music Festival', userName: 'Bob Wilson', date: '1 day ago', status: 'confirmed' }
        ]);
      } catch (error) {
        console.error('Error fetching organizer dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizerData();
  }, []);

  const statCards = [
    {
      title: 'My Events',
      value: stats.totalEvents,
      icon: FiCalendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      change: '+2 this month'
    },
    {
      title: 'Total Registrations',
      value: stats.totalRegistrations,
      icon: FiUsers,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      change: '+23 today'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue}`,
      icon: FiDollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      change: '+12% this week'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: FiClock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
      change: 'Next in 3 days'
    }
  ];

  const quickActions = [
    {
      title: 'Create Event',
      description: 'Add a new event',
      icon: FiPlus,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      action: () => console.log('Create event clicked')
    },
    {
      title: 'Analytics',
      description: 'View performance',
      icon: FiBarChart,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      action: () => console.log('Analytics clicked')
    },
    {
      title: 'Event Settings',
      description: 'Configure events',
      icon: FiSettings,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      action: () => console.log('Settings clicked')
    },
    {
      title: 'Promotions',
      description: 'Boost visibility',
      icon: FiMic,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      action: () => console.log('Promotions clicked')
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
          <div className="flex items-center mb-2">
            <FiMic className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Organizer Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.full_name || 'Organizer'}. Manage your events and track performance.
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
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${stat.iconColor}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* My Events */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  My Events
                </h2>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {myEvents.map((event, index) => (
                  <div key={event.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                          <FiCalendar className="text-white w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <FiMapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                          <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                          <FiEdit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Price: </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ${event.price || '0'}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Category: </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiStar className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">4.8</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Registrations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Registrations
                </h2>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentRegistrations.map((registration, index) => (
                  <div key={registration.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-3 text-white font-semibold">
                        {registration.userName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {registration.userName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {registration.eventName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        registration.status === 'confirmed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {registration.status}
                      </span>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {registration.date}
                      </p>
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

export default OrganizerDashboard;
