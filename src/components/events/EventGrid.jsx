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
  hidden: { opacity:0, y:20 },
  show: { opacity:1, y:0, transition: { type: 'spring', stiffness: 100 } }
}

export default function EventGrid({ events, onOpen }){
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map(ev=> (
        <motion.div key={ev.id} variants={item}>
          <EventCard event={ev} onClick={()=>onOpen(ev)} />
        </motion.div>
      ))}
    </motion.div>
  )
}
