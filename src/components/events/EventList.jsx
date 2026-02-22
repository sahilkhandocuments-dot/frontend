import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
}

export default function EventList({ events, onOpen }){
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
      {events.map(ev=> (
        <motion.div key={ev.id} variants={item}>
          <motion.article 
            className="glass-card p-4 rounded-xl cursor-pointer flex gap-4 items-center"
            onClick={() => onOpen(ev)}
            whileHover={{ scale: 1.02, x: 10 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Image */}
            <motion.div 
              className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0"
              whileHover={{ scale: 1.1 }}
            >
              <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{ev.title}</h3>
              <p className="text-sm text-gray-400">{ev.date} · {ev.category}</p>
            </div>

            {/* Price & Button */}
            <div className="flex items-center gap-3">
              <span className="font-bold text-secondary">{ev.price ? `$${ev.price}` : 'Free'}</span>
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Pass
              </motion.button>
            </div>
          </motion.article>
        </motion.div>
      ))}
    </motion.div>
  )
}