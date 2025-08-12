'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Rocket, ArrowRight, Sparkles, Star } from 'lucide-react';

function ad() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-14">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main Ad Card */}
          <div className="bg-gradient-to-r from-primary via-primary/95 to-secondary rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-xl"></div>
            
            {/* Floating Icons */}
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-4 right-6 text-white/20"
            >
              <Sparkles size={20} />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-4 left-6 text-white/20"
            >
              <Rocket size={16} />
            </motion.div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Content Section */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex-1 text-center md:text-left"
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1 rounded-full text-xs font-medium mb-4"
                  >
                    <Rocket size={14} />
                    Special Launch Offer
                  </motion.div>

                  {/* Headline */}
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-bold text-white mb-3"
                  >
                    Ready to transform your{' '}
                    <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      business?
                    </span>
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-base md:text-lg text-white/90 mb-4 max-w-2xl"
                  >
                    Be among the first to experience our innovative solutions with special pricing for early adopters.
                  </motion.p>

                  {/* Features */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-4 justify-center md:justify-start"
                  >
                    <div className="flex items-center gap-2 text-white/80">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Custom Solutions</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Priority Support</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center md:items-end gap-4"
                >
                  {/* Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <Link href="/contact-us" className="flex items-center gap-2">
                        Get Started Now
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </motion.div>

                  {/* Trust Indicators */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center md:text-right"
                  >
                    <p className="text-white/70 text-sm mb-2">Be the first to experience our solutions</p>
                    <div className="flex items-center gap-2 justify-center md:justify-end">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="text-yellow-300 fill-current" />
                        ))}
                      </div>
                      <span className="text-white/80 text-sm ml-2">Premium Quality</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ad;
