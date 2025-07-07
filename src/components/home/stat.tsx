'use client';
import React, { useEffect, useState, useRef } from 'react';
import { qualities } from '@/constants/data';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

function Stat() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % qualities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    const scrollX = scrollRef.current?.scrollLeft ?? 0;
    const width = scrollRef.current?.offsetWidth ?? 1;
    const index = Math.round(scrollX / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const current = qualities[currentIndex];

  return (
    <div className="bg-accent w-screen grid grid-cols-1 md:grid-cols-2 px-6 md:px-28 py-20 gap-20 justify-between mb-24">
      
      {/* LEFT TEXT SECTION */}
      <div>
        <div className="text-4xl font-semibold mb-4">
          Helping local & international{' '}
          <span className="text-secondary">businesses grow with purpose</span>
        </div>
        <div className="text-base text-gray-700">
          Our focus isn't just on outcomes, but on the principles that shape them.
        </div>
      </div>

      {/* RIGHT SIDE SECTION */}
      <div className="flex flex-col items-center w-full relative">
        
        {/* IMAGE */}
        <div
          className="relative mb-6 overflow-hidden"
          style={{
            height: '240px',
            width: '580px',
            borderRadius: '40px',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.title}
                layout="fill"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SCROLLABLE DESCRIPTION AREA */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE 10+
          }}
          className="space-x-6 w-full max-w-md px-2"
        >
          {qualities.map((item, index) => (
            <div
              key={index}
              style={{
                minWidth: '100%',
                scrollSnapAlign: 'center',
              }}
              className="flex-shrink-0 flex flex-col items-center text-center relative"
            >
              <item.icon size={28} className="text-secondary mb-2" />
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>

              {/* Scrollable Description with overlay indicator */}
              <div className="relative max-w-sm max-h-24 overflow-y-auto px-2">
                <p className="text-sm text-gray-700 pr-2">
                  {item.description}
                </p>
                {/* Fading gradient to suggest scrolling */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 w-full h-6"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.7), rgba(255,255,255,1))',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stat;
