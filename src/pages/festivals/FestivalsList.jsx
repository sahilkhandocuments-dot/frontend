import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiSearch } from 'react-icons/fi';

const FestivalsList = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setFestivals([
        {
          id: 1,
          name: 'Cultural Fest 2024',
          description: 'Annual cultural celebration with dance, music, and art',
          start_date: '2024-03-15',
          end_date: '2024-03-17',
          location: 'Main Campus',
          status: 'upcoming',
          participants_count: 245,
          competitions_count: 12
        },
        {
          id: 2,
          name: 'Tech Symposium',
          description: 'Technology and innovation showcase',
          start_date: '2024-04-10',
          end_date: '2024-04-12',
          location: 'Engineering Block',
          status: 'upcoming',
          participants_count: 180,
          competitions_count: 8
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredFestivals = festivals.filter(festival => {
    const matchesSearch = festival.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         festival.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || festival.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Festivals</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover and participate in exciting festivals</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search festivals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full sm:w-64"
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredFestivals.map((festival, index) => (
          <motion.div
            key={festival.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {festival.name}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  festival.status === 'upcoming' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : festival.status === 'ongoing'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {festival.status}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {festival.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FiCalendar className="mr-2 h-4 w-4" />
                  {new Date(festival.start_date).toLocaleDateString()} - {new Date(festival.end_date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FiMapPin className="mr-2 h-4 w-4" />
                  {festival.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FiUsers className="mr-2 h-4 w-4" />
                  {festival.participants_count} participants • {festival.competitions_count} competitions
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/festivals/${festival.id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredFestivals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No festivals found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Check back later for new festivals'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FestivalsList;