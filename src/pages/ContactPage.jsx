import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/layout/PublicLayout';
import { FiMail, FiPhone, FiMapPin, FiSend, FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: 'hello@eventx.com', href: 'mailto:hello@eventx.com' },
    { icon: FiPhone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: FiMapPin, label: 'Address', value: '123 Event Street, NYC 10001', href: '#' }
  ];

  const socialLinks = [
    { icon: FiTwitter, label: 'Twitter', href: '#' },
    { icon: FiGithub, label: 'GitHub', href: '#' },
    { icon: FiLinkedin, label: 'LinkedIn', href: '#' }
  ];

  return (
    <PublicLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300">We'd love to hear from you. Send us a message!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Your Name</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    whileFocus={{ borderColor: '#38bdf8' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Email Address</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    whileFocus={{ borderColor: '#38bdf8' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Subject</label>
                  <motion.input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    whileFocus={{ borderColor: '#38bdf8' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Message</label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows="5"
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
                    whileFocus={{ borderColor: '#38bdf8' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(56,189,248,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Send Message <FiSend />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Details */}
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={info.href}
                      className="flex items-start gap-4 hover:text-primary transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="bg-gradient-to-br from-primary/20 to-secondary/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="text-primary" size={20} />
                      </motion.div>
                      <div>
                        <p className="font-semibold mb-1">{info.label}</p>
                        <p className="text-gray-400 group-hover:text-primary transition-colors">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={social.href}
                      className="bg-gradient-to-br from-primary/20 to-secondary/20 w-14 h-14 rounded-xl flex items-center justify-center hover:from-primary/30 hover:to-secondary/30 transition-all"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="text-primary" size={24} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <motion.div 
              className="glass-card p-8 rounded-2xl h-64 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <FiMapPin className="text-primary mx-auto mb-2" size={48} />
                <p className="text-gray-400">Map Integration</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </PublicLayout>
  );
}
