import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiFileText, FiMapPin, FiCalendar, FiDollarSign, FiTag, FiArrowRight, FiX, FiCheck } from 'react-icons/fi';
import PublicLayout from '../components/layout/PublicLayout';

export default function SubmitPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    price: '',
    category: '',
    image: null,
    imagePreview: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const steps = [
    { number: 1, title: 'Basic Info', icon: FiFileText },
    { number: 2, title: 'Details', icon: FiMapPin },
    { number: 3, title: 'Image', icon: FiUploadCloud },
    { number: 4, title: 'Review', icon: FiCheck }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setStep(step + 1);
    setIsLoading(false);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const pageVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Submit Your Event
            </h1>
            <p className="text-gray-400">Share your event with thousands of attendees</p>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-12 px-4"
          >
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.number} className="flex items-center flex-1">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s.number
                        ? 'bg-gradient-to-r from-primary to-secondary text-black'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                    animate={{ scale: step === s.number ? 1.1 : 1 }}
                  >
                    <Icon size={20} />
                  </motion.div>
                  {idx < steps.length - 1 && (
                    <motion.div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        step > s.number
                          ? 'bg-gradient-to-r from-primary to-secondary'
                          : 'bg-gray-800'
                      }`}
                      layoutId={`progress-${idx}`}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="glass-card p-8 rounded-2xl"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
                    Basic Information
                  </motion.h2>

                  <motion.div variants={itemVariants} className="relative group">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Event Title</label>
                    <motion.input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter event title..."
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                      whileFocus={{ borderColor: '#38bdf8' }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative group">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Description</label>
                    <motion.textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your event..."
                      rows="4"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
                      whileFocus={{ borderColor: '#38bdf8' }}
                    />
                  </motion.div>

                  {/* Navigation Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex gap-3 pt-4"
                  >
                    <motion.button
                      type="button"
                      disabled
                      className="flex-1 border border-gray-700 text-gray-400 py-3 rounded-lg opacity-50 cursor-not-allowed"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      disabled={!formData.title || !formData.description || isLoading}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next <FiArrowRight />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
                    Event Details
                  </motion.h2>

                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Date</label>
                      <motion.input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        whileFocus={{ borderColor: '#38bdf8' }}
                      />
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Price ($)</label>
                      <motion.input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                        whileFocus={{ borderColor: '#38bdf8' }}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Location</label>
                      <motion.input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, Venue..."
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                        whileFocus={{ borderColor: '#38bdf8' }}
                      />
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Category</label>
                      <motion.select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        whileFocus={{ borderColor: '#38bdf8' }}
                      >
                        <option value="">Select category</option>
                        <option value="Music">Music</option>
                        <option value="Tech">Tech</option>
                        <option value="Art">Art</option>
                        <option value="Sports">Sports</option>
                        <option value="Comedy">Comedy</option>
                      </motion.select>
                    </div>
                  </motion.div>

                  {/* Navigation Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex gap-3 pt-4"
                  >
                    <motion.button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 border border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      disabled={!formData.date || !formData.location || !formData.category || isLoading}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next <FiArrowRight />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Image Upload */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
                    Event Image
                  </motion.h2>

                  {formData.imagePreview ? (
                    <motion.div
                      variants={itemVariants}
                      className="relative group rounded-xl overflow-hidden h-64"
                    >
                      <motion.img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        layoutId="image-preview"
                      />
                      <motion.button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: null }))}
                        className="absolute top-3 right-3 bg-red-500 p-2 rounded-full hover:bg-red-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiX size={20} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={itemVariants}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleImageDrop}
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                        isDragging ? 'border-primary bg-primary/10' : 'border-gray-700 hover:border-primary'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <FiUploadCloud size={48} className="mx-auto mb-4 text-primary" />
                      <p className="text-lg font-semibold mb-2">Drag and drop your image</p>
                      <p className="text-gray-400 mb-4">or click to browse</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        id="image-input"
                      />
                      <label htmlFor="image-input" className="cursor-pointer">
                        <motion.button
                          type="button"
                          onClick={() => document.getElementById('image-input')?.click()}
                          className="bg-gradient-to-r from-primary to-secondary text-black font-bold px-6 py-2 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Select Image
                        </motion.button>
                      </label>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex gap-3 pt-4"
                  >
                    <motion.button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 border border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      disabled={!formData.imagePreview || isLoading}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next <FiArrowRight />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
                    Review Your Event
                  </motion.h2>

                  <motion.div
                    variants={itemVariants}
                    className="space-y-4 bg-gray-900/50 p-6 rounded-xl"
                  >
                    {formData.imagePreview && (
                      <motion.img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                        layoutId="image-preview"
                      />
                    )}

                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm">Event Title</p>
                      <p className="text-xl font-bold">{formData.title}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Date</p>
                        <p className="font-semibold">{formData.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Price</p>
                        <p className="font-semibold">${formData.price || '0'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="font-semibold">{formData.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Category</p>
                        <p className="font-semibold">{formData.category}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">Description</p>
                      <p className="text-sm">{formData.description}</p>
                    </div>
                  </motion.div>

                  {/* Navigation Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex gap-3 pt-4"
                  >
                    <motion.button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 border border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Submit Event <FiCheck />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
