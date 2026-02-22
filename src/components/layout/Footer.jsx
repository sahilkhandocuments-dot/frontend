import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';

export default function Footer(){
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const socialLinks = [
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiMail, href: '#', label: 'Email' }
  ];

  const footerLinks = [
    { title: 'Product', links: ['Discover', 'Submit Event', 'Pricing'] },
    { title: 'Company', links: ['About', 'Blog', 'Contact'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] }
  ];

  return (
    <footer className="relative mt-20 py-16 border-t border-gray-800">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
            >
              EventX
            </motion.h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover amazing events and experiences in your city. Curated, verified, and just for you.
            </p>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <motion.li
                    key={link}
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                    >
                      {link}
                      <FiArrowRight size={14} opacity={0} className="group-hover:opacity-100" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-8"
        />

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <motion.p variants={itemVariants} className="text-sm text-gray-400 text-center md:text-left">
            © {currentYear} EventX. All rights reserved. Built with passion for event enthusiasts.
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  title={social.label}
                  className="p-2 rounded-full hover:bg-primary/10 text-gray-400 hover:text-primary transition-all"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </footer>
  )
}
