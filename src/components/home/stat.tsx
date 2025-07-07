'use client';
import React, { useEffect, useState } from 'react';
import { qualities } from '@/constants/data';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


function Stat() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % qualities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = qualities[currentIndex];

  return (
    <div className="bg-accent w-screen grid grid-cols-1 md:grid-cols-2 px-6 md:px-28 py-20 gap-20 justify-between mb-24">
   
      <div>
        <div className="text-4xl font-semibold mb-4">
          Helping local & international{' '}
          <span className="text-secondary">businesses grow with purpose</span>
        </div>
        <div className="text-base text-gray-700">
          Our focus isn't just on outcomes, but on the principles that shape them.
        </div>
      </div>
      <div className="flex justify-center items-center min-h-[260px] relative">
        <AnimatePresence mode="wait">
         <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.8 }}
             transition={{ duration: 1, ease: 'easeInOut' }}
             className="flex flex-col items-center text-center absolute">
          <Image src={current.image} alt={current.title} width={250}height={160}className="object-contain mb-4 rounded-xl"/>
          <current.icon size={28} className="text-secondary mb-2" />
          <h3 className="text-lg font-bold mb-1">{current.title}</h3>
          <p className="text-sm text-gray-700 max-w-sm">{current.description}</p>
         </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

export default Stat;
 