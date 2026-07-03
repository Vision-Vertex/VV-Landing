'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Heart, Rocket } from 'lucide-react';
import { startupStats } from '@/constants/data';
import { SectionTag } from '../ui/section-tag';
import { SectionTitle } from '../ui/section-title';

const iconMap = {
  Target,
  Zap,
  Heart,
  Rocket,
} as const;

type StatIconKey = keyof typeof iconMap;

function Stat() {
  return (
    <section className="relative bg-gray-50 py-16 md:py-20 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-14">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SectionTag>Startup Journey</SectionTag>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <SectionTitle as="h2" accent="one step at a time" className="text-2xl md:text-3xl">
              Building the future,
            </SectionTitle>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;re a passionate startup team committed to innovation and growth.
            Every day brings new opportunities to learn, adapt, and excel.
          </motion.p>
        </motion.div>

        {/* Stat cards — solid colors, no gradients */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-12 md:mb-16"
        >
          {startupStats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as StatIconKey] ?? Target;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 md:p-8 text-center border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/20"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={1.75} />
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 md:mt-5 tracking-tight">
                  {stat.number}
                </h3>

                <p className="text-base md:text-lg font-semibold text-secondary mt-1">
                  {stat.label}
                </p>

                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Vision section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
            <SectionTag className="mb-4 [&_span]:text-xs">
              Our Vision
            </SectionTag>

            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl font-bold text-gray-900 mb-3"
            >
              Pioneering Tomorrow&apos;s Solutions
            </motion.h3>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              As a startup, we&apos;re driven by innovation and the belief that great things start small.
              We&apos;re building solutions that matter, learning from every challenge, and growing stronger each day.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Stat;
