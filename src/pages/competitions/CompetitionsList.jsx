import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiAward, FiSearch, FiFilter } from 'react-icons/fi';

const CompetitionsList = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = ['all', 'Cultural', 'Technical', 'Sports', 'Literary', 'Arts', 'Music', 'Dance', 'Drama'];
  const statuses = ['all', 'upcoming', 'ongoing', 'registration_open', 'registration_closed'];

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setCompetitions([
        {
          id: 1,
          name: 'Classical Dance Championship',
          description: 'Showcase traditional dance forms from across India',
          category: 'Cultural',
          festival_name: 'Cultural Fest 2024',
          start_date: '2024-03-16',
          registration_deadline: '2024-03-10',
          status: 'registration_open',
          participants_count: 25,
          max_participants: 50,
          prize_pool: 15000,
          team_size: 'Individual',
          difficulty_level: 'Intermediate'
        },
        {
          id: 2,
          name: 'Web Development Hackathon',
          description: 'Build innovative web applications in 48 hours',
          category: 'Technical',
          festival_name: 'Tech Symposium',
          start_date: '2024-04-11',
          registration_deadline: '2024-04-05',
          status: 'upcoming',
          participants_count: 48,
          max_participants: 60,
          prize_pool: 25000,
          team_size: '2-4 members',
          difficulty_level: 'Advanced'
        },
        {
          id: 3,
          name: 'Poetry Slam',
          description: 'Express yourself through the power of spoken word',
          category: 'Literary',
          festival_name: 'Arts Festival',
          start_date: '2024-03-20',
          registration_deadline: '2024-03-15',
          status: 'registration_open',
          participants_count: 12,
          max_participants: 30,
          prize_pool: 8000,
          team_size: 'Individual',
          difficulty_level: 'Beginner'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCompetitions = competitions.filter(competition => {
    const matchesSearch = competition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.festival_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || competition.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || competition.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'registration_open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'registration_closed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Competitions</h1>
          <p className="text-gray-600 dark:text-gray-400">Find and join exciting competitions</p>
        </div>
        
        <Link
          to="/competitions/create"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Competition
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search competitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Competitions Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredCompetitions.map((competition, index) => (
          <motion.div
            key={competition.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {competition.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {competition.festival_name}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(competition.status)}`}>
                    {competition.status.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(competition.difficulty_level)}`}>
                    {competition.difficulty_level}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {competition.description}
              </p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Category:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{competition.category}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Team Size:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{competition.team_size}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Prize Pool:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">₹{competition.prize_pool.toLocaleString()}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FiCalendar className="mr-1 h-4 w-4" />
                  Event: {new Date(competition.start_date).toLocaleDateString()}
                </div>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FiUsers className="mr-1 h-4 w-4" />
                  {competition.participants_count}/{competition.max_participants} registered
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Registration Deadline: {new Date(competition.registration_deadline).toLocaleDateString()}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Registrations</span>
                  <span>{Math.round((competition.participants_count / competition.max_participants) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(competition.participants_count / competition.max_participants) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  to={`/competitions/${competition.id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  View Details
                </Link>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    competition.status === 'registration_open'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={competition.status !== 'registration_open'}
                >
                  {competition.status === 'registration_open' ? 'Register' : 'Closed'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredCompetitions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No competitions found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Check back later for new competitions'
            }
          </p>
          {(filterCategory !== 'all' || filterStatus !== 'all' || searchTerm) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setFilterStatus('all');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CompetitionsList;