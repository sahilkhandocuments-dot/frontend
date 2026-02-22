import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiArrowLeft, FiEdit, FiAward } from 'react-icons/fi';

const FestivalDetail = () => {
  const { id } = useParams();
  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setFestival({
        id: parseInt(id),
        name: 'Cultural Fest 2024',
        description: 'Annual cultural celebration featuring dance, music, drama, and art competitions. Join us for three days of incredible performances and showcase your talents.',
        long_description: 'Our annual cultural festival is the highlight of the academic year, bringing together students from all departments to celebrate creativity, talent, and cultural diversity. The festival features multiple competition categories, workshops, performances, and cultural exchanges.',
        start_date: '2024-03-15',
        end_date: '2024-03-17',
        location: 'Main Campus Auditorium',
        status: 'upcoming',
        participants_count: 245,
        competitions_count: 12,
        organizer: 'Cultural Committee',
        contact_email: 'cultural@college.edu',
        registration_deadline: '2024-03-10',
        entry_fee: 500,
        prize_pool: 50000,
        competitions: [
          { id: 1, name: 'Classical Dance', category: 'Dance', participants: 35 },
          { id: 2, name: 'Folk Music', category: 'Music', participants: 28 },
          { id: 3, name: 'Drama Performance', category: 'Theatre', participants: 42 },
          { id: 4, name: 'Art Exhibition', category: 'Visual Arts', participants: 31 }
        ],
        schedule: [
          { day: 'Day 1 - March 15', events: ['Opening Ceremony', 'Dance Competitions', 'Art Exhibition Setup'] },
          { day: 'Day 2 - March 16', events: ['Music Competitions', 'Drama Performances', 'Workshops'] },
          { day: 'Day 3 - March 17', events: ['Finals', 'Award Ceremony', 'Closing Celebration'] }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!festival) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Festival not found</h1>
        <Link to="/festivals" className="text-blue-600 hover:text-blue-700">
          Back to festivals
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'competitions', label: 'Competitions' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'registration', label: 'Registration' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link 
          to="/festivals"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back to Festivals
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {festival.name}
                </h1>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  festival.status === 'upcoming' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : festival.status === 'ongoing'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {festival.status}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {festival.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiCalendar className="mr-2" />
                  {new Date(festival.start_date).toLocaleDateString()} - {new Date(festival.end_date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiMapPin className="mr-2" />
                  {festival.location}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiUsers className="mr-2" />
                  {festival.participants_count} participants
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Register Now
              </button>
              <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiEdit className="mr-2" />
                Edit
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {festival.competitions_count}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Competitions</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            ₹{festival.prize_pool.toLocaleString()}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Prize Pool</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            ₹{festival.entry_fee}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Entry Fee</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            3
          </div>
          <div className="text-gray-600 dark:text-gray-400">Days</div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  About the Festival
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {festival.long_description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Event Details
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li><strong>Organizer:</strong> {festival.organizer}</li>
                    <li><strong>Contact:</strong> {festival.contact_email}</li>
                    <li><strong>Registration Deadline:</strong> {new Date(festival.registration_deadline).toLocaleDateString()}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quick Stats
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li><strong>Total Participants:</strong> {festival.participants_count}</li>
                    <li><strong>Total Competitions:</strong> {festival.competitions_count}</li>
                    <li><strong>Duration:</strong> 3 days</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'competitions' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Competition Categories
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {festival.competitions.map((competition) => (
                  <div key={competition.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {competition.name}
                      </h4>
                      <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {competition.category}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FiUsers className="mr-1 h-4 w-4" />
                      {competition.participants} participants
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Event Schedule
              </h3>
              <div className="space-y-4">
                {festival.schedule.map((day, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {day.day}
                    </h4>
                    <ul className="space-y-1">
                      {day.events.map((event, eventIndex) => (
                        <li key={eventIndex} className="text-gray-600 dark:text-gray-400 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'registration' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Registration Information
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Registration Details
                  </h4>
                  <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                    <li>• Registration Fee: ₹{festival.entry_fee}</li>
                    <li>• Deadline: {new Date(festival.registration_deadline).toLocaleDateString()}</li>
                    <li>• Open to all college students</li>
                    <li>• Team and individual categories available</li>
                  </ul>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Register for Festival
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FestivalDetail;