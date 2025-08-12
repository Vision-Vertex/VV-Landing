'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Heart, Rocket } from 'lucide-react';
import { startupStats } from '@/constants/data';

function Stat() {
  // Icon mapping
  const iconMap = {
    'Target': Target,
    'Zap': Zap,
    'Heart': Heart,
    'Rocket': Rocket
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-16 overflow-hidden">
      {/* Unique Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-14">
        {/* Unique Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Rocket size={16} />
            Startup Journey
          </motion.div>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          >
            Building the future,{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              one step at a time
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm text-gray-600 max-w-2xl mx-auto"
          >
            We're a passionate startup team committed to innovation and growth. 
            Every day brings new opportunities to learn, adapt, and excel.
          </motion.p>
        </motion.div>

        {/* Compact Stats Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {startupStats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-lg p-4 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-1.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-md text-primary group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={20} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {stat.number}
                    </h3>
                    <h4 className="text-xs font-semibold text-gray-700">
                      {stat.label}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Unique Vision Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium mb-4"
              >
                <Target size={12} />
                Our Vision
              </motion.div>

              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl font-bold text-gray-900 mb-3"
              >
                Pioneering Tomorrow's Solutions
              </motion.h3>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
                className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed"
              >
                As a startup, we're driven by innovation and the belief that great things start small. 
                We're building solutions that matter, learning from every challenge, and growing stronger each day.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Stat;
