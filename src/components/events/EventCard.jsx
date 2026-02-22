import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiTag } from 'react-icons/fi';

export default function EventCard({ event, onClick }){
  return (
    <motion.article 
      layoutId={`card-${event.id}`} 
      className="group glass-card p-0 rounded-xl overflow-hidden cursor-pointer h-full"
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(56,189,248,0.2)' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
        <motion.img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15, rotate: 2 }}
          transition={{ duration: 0.4 }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <motion.div
          className="absolute top-3 right-3 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full px-3 py-1 flex items-center gap-1"
          whileHover={{ scale: 1.1 }}
        >
          <FiTag size={14} />
          <span className="text-xs font-semibold text-primary">{event.category}</span>
        </motion.div>

        {/* Price Badge */}
        <motion.div
          className="absolute bottom-3 left-3 bg-secondary/20 backdrop-blur-md border border-secondary/30 rounded-lg px-3 py-1"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-sm font-bold text-secondary">{event.price ? `$${event.price}` : 'FREE'}</span>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Title */}
        <motion.h3 
          className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors"
          whileHover={{ x: 5 }}
        >
          {event.title}
        </motion.h3>

        {/* Date and Time */}
        <motion.div 
          className="flex items-center gap-2 text-sm text-gray-300 mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          <FiClock size={14} className="text-primary" />
          <span>{event.date}</span>
        </motion.div>

        {/* Button */}
        <motion.button 
          className="w-full bg-gradient-to-r from-primary to-secondary text-black font-semibold py-2 rounded-lg text-sm transition-all"
          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(56,189,248,0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Get Pass
        </motion.button>
      </div>
    </motion.article>
  )
}
