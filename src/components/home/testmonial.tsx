'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Image from 'next/image';
import { testmonial as testimonialList } from '@/constants/data';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

function testmonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialList.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialList.length) % testimonialList.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Colorful Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-14">
        {/* Header Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Star size={16} />
            Client Success Stories
          </motion.div>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            What our clients{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              say about us
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover how we've helped businesses transform their digital presence 
            and achieve remarkable results through our innovative solutions.
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main Testimonial Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center mb-8"
              >
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
                  <Quote size={32} className="text-primary" />
                </div>
              </motion.div>

              {/* Testimonial Content */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic mb-8 max-w-4xl mx-auto">
                  "{testimonialList[activeIndex].quote}"
                </p>

                {/* Client Info */}
                <div className="flex items-center justify-center gap-4">
                  <div className="relative">
                    <Image
                      src={testimonialList[activeIndex].image}
                      alt={testimonialList[activeIndex].name}
                      width={60}
                      height={60}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <Star size={12} className="text-white fill-white" />
        </div>
      </div>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900">{testimonialList[activeIndex].name}</h4>
                    <p className="text-sm text-gray-600">Satisfied Client</p>
                  </div>
  </div>
              </motion.div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mb-6">
            {testimonialList.map((_, idx) => (
                  <button
                key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === activeIndex 
                        ? 'bg-gradient-to-r from-primary to-secondary scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
      </div>
    </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronLeft size={20} className="text-gray-600 group-hover:text-primary transition-colors" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronRight size={20} className="text-gray-600 group-hover:text-primary transition-colors" />
          </button>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
         
        </motion.div>
    </div>
    </section>
  );
}

export default testmonial;

