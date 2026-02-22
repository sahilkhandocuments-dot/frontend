import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiDollarSign, FiUsers, FiSave } from 'react-icons/fi';

const CreateFestival = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    long_description: '',
    start_date: '',
    end_date: '',
    location: '',
    entry_fee: '',
    prize_pool: '',
    organizer: '',
    contact_email: '',
    registration_deadline: '',
    max_participants: '',
    categories: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Cultural', 'Technical', 'Sports', 'Literary', 'Arts', 'Music', 'Dance', 'Drama'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Festival name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.start_date) newErrors.start_date = 'Start date is required';
    if (!formData.end_date) newErrors.end_date = 'End date is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.organizer.trim()) newErrors.organizer = 'Organizer is required';
    if (!formData.contact_email.trim()) newErrors.contact_email = 'Contact email is required';
    if (!formData.registration_deadline) newErrors.registration_deadline = 'Registration deadline is required';

    if (formData.start_date && formData.end_date && new Date(formData.start_date) >= new Date(formData.end_date)) {
      newErrors.end_date = 'End date must be after start date';
    }

    if (formData.registration_deadline && formData.start_date && new Date(formData.registration_deadline) >= new Date(formData.start_date)) {
      newErrors.registration_deadline = 'Registration deadline must be before start date';
    }

    if (formData.entry_fee && isNaN(Number(formData.entry_fee))) {
      newErrors.entry_fee = 'Entry fee must be a number';
    }

    if (formData.prize_pool && isNaN(Number(formData.prize_pool))) {
      newErrors.prize_pool = 'Prize pool must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Festival created:', formData);
      // Navigate to festivals list or show success message
    } catch (error) {
      console.error('Error creating festival:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create New Festival
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Set up a new festival with competitions and events
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Festival Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                  }`}
                  placeholder="Enter festival name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Organizer *
                </label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                    errors.organizer ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                  }`}
                  placeholder="Organizing committee/department"
                />
                {errors.organizer && <p className="text-red-500 text-sm mt-1">{errors.organizer}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Short Description *
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                  errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                }`}
                placeholder="Brief description of the festival"
                maxLength={200}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Detailed Description
              </label>
              <textarea
                name="long_description"
                value={formData.long_description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                placeholder="Detailed information about the festival..."
              />
            </div>
          </div>

          {/* Date and Location */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Date & Location
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date *
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                      errors.start_date ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                    }`}
                  />
                </div>
                {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date *
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                      errors.end_date ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                    }`}
                  />
                </div>
                {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Registration Deadline *
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="registration_deadline"
                    value={formData.registration_deadline}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                      errors.registration_deadline ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                    }`}
                  />
                </div>
                {errors.registration_deadline && <p className="text-red-500 text-sm mt-1">{errors.registration_deadline}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                    errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                  }`}
                  placeholder="Festival venue/location"
                />
              </div>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Financial Details
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Entry Fee (₹)
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="entry_fee"
                    value={formData.entry_fee}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                      errors.entry_fee ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                    }`}
                    placeholder="0"
                    min="0"
                  />
                </div>
                {errors.entry_fee && <p className="text-red-500 text-sm mt-1">{errors.entry_fee}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prize Pool (₹)
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="prize_pool"
                    value={formData.prize_pool}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                      errors.prize_pool ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                    }`}
                    placeholder="0"
                    min="0"
                  />
                </div>
                {errors.prize_pool && <p className="text-red-500 text-sm mt-1">{errors.prize_pool}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Participants
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="max_participants"
                    value={formData.max_participants}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                    placeholder="Unlimited"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Festival Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                  errors.contact_email ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                }`}
                placeholder="contact@college.edu"
              />
              {errors.contact_email && <p className="text-red-500 text-sm mt-1">{errors.contact_email}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <FiSave className="mr-2" />
              )}
              {isSubmitting ? 'Creating Festival...' : 'Create Festival'}
            </button>
            
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Save as Draft
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateFestival;