import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBarChart, 
  FiTrendingUp, 
  FiUsers, 
  FiDollarSign,
  FiCalendar,
  FiActivity,
  FiDownload,
  FiRefreshCw,
  FiEye,
  FiStar
} from 'react-icons/fi';
import { mockStats, mockEvents } from '../../data/mockData';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalRevenue: 0,
      totalEvents: 0,
      totalUsers: 0,
      totalRegistrations: 0
    },
    revenueGrowth: 0,
    userGrowth: 0,
    eventGrowth: 0,
    registrationGrowth: 0,
    topEvents: [],
    recentActivities: [],
    monthlyData: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyticsData({
        overview: {
          totalRevenue: 125430,
          totalEvents: 45,
          totalUsers: 2341,
          totalRegistrations: 5672
        },
        revenueGrowth: 12.5,
        userGrowth: 8.2,
        eventGrowth: 15.7,
        registrationGrowth: 23.1,
        topEvents: [
          { id: 1, name: 'Summer Music Festival', revenue: 25430, registrations: 856 },
          { id: 2, name: 'Tech Conference 2024', revenue: 18750, registrations: 623 },
          { id: 3, name: 'Food & Wine Expo', revenue: 12340, registrations: 445 },
          { id: 4, name: 'Art Gallery Opening', revenue: 8920, registrations: 312 },
          { id: 5, name: 'Charity Run Marathon', revenue: 7650, registrations: 278 }
        ],
        recentActivities: [
          { id: 1, action: 'New user registration', user: 'John Doe', time: '2 minutes ago' },
          { id: 2, action: 'Event ticket purchased', event: 'Summer Festival', time: '5 minutes ago' },
          { id: 3, action: 'Event created', organizer: 'Jane Smith', time: '12 minutes ago' },
          { id: 4, action: 'Payment processed', amount: '$89.99', time: '18 minutes ago' },
          { id: 5, action: 'User profile updated', user: 'Bob Wilson', time: '25 minutes ago' }
        ],
        monthlyData: [
          { month: 'Jan', revenue: 8500, users: 156, events: 3 },
          { month: 'Feb', revenue: 12200, users: 234, events: 5 },
          { month: 'Mar', revenue: 15600, users: 312, events: 7 },
          { month: 'Apr', revenue: 18900, users: 298, events: 6 },
          { month: 'May', revenue: 22300, users: 445, events: 8 },
          { month: 'Jun', revenue: 19800, users: 378, events: 7 }
        ]
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    const csvContent = [
      ['Period', 'Revenue', 'Users', 'Events', 'Registrations'],
      ...analyticsData.monthlyData.map(data => [
        data.month,
        data.revenue,
        data.users,
        data.events,
        data.revenue / 50 // approximate registrations
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
        <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiBarChart className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive insights and performance metrics
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
              
              <button
                onClick={exportReport}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Export
              </button>
              
              <button
                onClick={fetchAnalytics}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <FiRefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${analyticsData.overview.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 dark:text-green-400">
                    +{analyticsData.revenueGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Events</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analyticsData.overview.totalEvents}
                </p>
                <div className="flex items-center mt-2">
                  <FiTrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    +{analyticsData.eventGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analyticsData.overview.totalUsers.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <FiTrendingUp className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600 dark:text-purple-400">
                    +{analyticsData.userGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Registrations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analyticsData.overview.totalRegistrations.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <FiTrendingUp className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600 dark:text-orange-400">
                    +{analyticsData.registrationGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <FiActivity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Top Events */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Top Performing Events
              </h2>
              <FiStar className="w-5 h-5 text-yellow-500" />
            </div>
            
            <div className="space-y-4">
              {analyticsData.topEvents.map((event, index) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {event.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.registrations} registrations
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 dark:text-green-400">
                      ${event.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Activities
              </h2>
              <FiActivity className="w-5 h-5 text-blue-500" />
            </div>
            
            <div className="space-y-4">
              {analyticsData.recentActivities.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.action}
                      {activity.user && <span className="font-medium"> by {activity.user}</span>}
                      {activity.event && <span className="font-medium"> for {activity.event}</span>}
                      {activity.amount && <span className="font-medium"> {activity.amount}</span>}
                      {activity.organizer && <span className="font-medium"> by {activity.organizer}</span>}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Monthly Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Monthly Performance
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Month
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    New Users
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Events
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {analyticsData.monthlyData.map((data, index) => {
                  const prevMonth = analyticsData.monthlyData[index - 1];
                  const growth = prevMonth ? ((data.revenue - prevMonth.revenue) / prevMonth.revenue * 100) : 0;
                  
                  return (
                    <tr key={data.month} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {data.month}
                      </td>
                      <td className="px-4 py-4 text-sm text-green-600 dark:text-green-400 font-medium">
                        ${data.revenue.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                        {data.users}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                        {data.events}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          growth > 0 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : growth < 0 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {growth > 0 && '+'}
                          {growth.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
