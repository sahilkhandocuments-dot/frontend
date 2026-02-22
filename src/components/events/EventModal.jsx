import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiClock, FiUsers, FiShare2 } from 'react-icons/fi';

export default function EventModal({ event, onClose }){
  if(!event) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30, duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div 
          layoutId={`card-${event.id}`}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative max-w-4xl w-full glass-modal rounded-2xl overflow-hidden"
        >
          {/* Close Button */}
          <motion.button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 z-10 transition-all"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX size={20} />
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <motion.div 
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="relative h-96 rounded-xl overflow-hidden group"
            >
              <motion.img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <motion.div
                className="absolute bottom-4 left-4 bg-gradient-to-r from-primary to-secondary text-black px-4 py-2 rounded-lg font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {event.price ? `$${event.price}` : 'FREE'}
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-between"
            >
              {/* Title */}
              <div>
                <motion.h2 
                  custom={1}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent"
                >
                  {event.title}
                </motion.h2>

                {/* Meta Information */}
                <motion.div 
                  custom={2}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3 mb-6"
                >
                  <div className="flex items-center gap-3 text-gray-300">
                    <FiClock className="text-primary text-lg" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FiUsers className="text-primary text-lg" />
                    <span>{event.category}</span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p 
                  custom={3}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-gray-200 leading-relaxed mb-6"
                >
                  {event.description}
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div 
                custom={4}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex gap-3"
              >
                <motion.button 
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 rounded-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(56,189,248,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Pass
                </motion.button>
                <motion.button 
                  className="p-3 rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiShare2 size={20} />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
