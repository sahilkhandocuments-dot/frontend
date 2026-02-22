import React from 'react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/layout/PublicLayout';
import { FiTarget, FiUsers, FiZap, FiHeart, FiAward, FiTrendingUp } from 'react-icons/fi';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = [
    {
      icon: FiTarget,
      title: 'Curated Events',
      description: 'Every event is carefully reviewed and approved to ensure quality and authenticity.'
    },
    {
      icon: FiUsers,
      title: 'Community Driven',
      description: 'Built by event lovers, for event lovers. Join thousands of passionate attendees.'
    },
    {
      icon: FiZap,
      title: 'Instant Booking',
      description: 'Book your tickets instantly with our streamlined checkout process.'
    },
    {
      icon: FiHeart,
      title: 'Personalized',
      description: 'Get recommendations based on your interests and past attendance.'
    },
    {
      icon: FiAward,
      title: 'Verified Organizers',
      description: 'All event organizers are verified to ensure trust and reliability.'
    },
    {
      icon: FiTrendingUp,
      title: 'Trending Events',
      description: 'Stay updated with the hottest events happening around you.'
    }
  ];

  const stats = [
    { label: 'Events Listed', value: '10K+' },
    { label: 'Happy Attendees', value: '50K+' },
    { label: 'Cities', value: '100+' },
    { label: 'Success Rate', value: '99%' }
  ];

  return (
    <PublicLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="text-center mb-20">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            About EventX
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We're on a mission to connect people through amazing experiences. 
            EventX is the premier platform for discovering, booking, and attending the best events in your city.
          </motion.p>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card p-6 text-center rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.h3 
                className="text-4xl font-bold text-primary mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="glass-card p-12 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed text-center mb-8">
                At EventX, we believe that great experiences bring people together. Our platform is designed to 
                make event discovery effortless and booking seamless. Whether you're looking for music festivals, 
                tech conferences, art exhibitions, or sports events, we've got you covered.
              </p>
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-12"
          >
            Why Choose EventX?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div
                    className="bg-gradient-to-br from-primary/20 to-secondary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="text-primary" size={28} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-12 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">Join thousands of event enthusiasts today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-primary to-secondary text-black font-bold px-8 py-3 rounded-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(56,189,248,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Events
              </motion.button>
              <motion.button
                className="border-2 border-primary text-primary font-bold px-8 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Event
              </motion.button>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </PublicLayout>
  );
}
