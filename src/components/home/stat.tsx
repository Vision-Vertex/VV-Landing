'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Stat() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="bg-accent w-screen grid grid-cols-1 md:grid-cols-2 px-6 md:px-28 py-10 gap-20 justify-between mb-24">
    
      <div>
        <div className="text-4xl font-semibold mb-4 pt-10">
          Helping local & international{' '}
          <span className="text-secondary">businesses grow with purpose</span>
        </div>
        <div className="text-base text-gray-700">
          Our focus isn't just on outcomes, but on the principles that shape them.
        </div>
      </div>

     
      <div className="flex justify-center items-center min-h-[260px]">
        <div
          className="relative w-full max-w-md h-[300px] perspective"
          onClick={() => setFlipped(!flipped)}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full transform-style-preserve-3d cursor-pointer"
          >
            {/*front*/}
            <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-xl p-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2 text-secondary">Our Mission</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                We aim to revolutionize our industry by focusing on sustainable innovation,
                empowering businesses, and delivering lasting impact.
              </p>
              <p className="mt-4 text-sm text-gray-500">(Click to view our Progress)</p>
             
            </div>

            {/*back*/}
            <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-xl p-6 flex flex-col justify-center rotate-y-180">
             <h3 className="text-2xl font-bold mb-2 text-secondary">What We've Achieved</h3>
              <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                <li>📈 200,000+ global users</li>
                <li>🌍 Presence in 4 countries</li>
                <li>🏆 1 award-winning products</li>
                
              </ul>
              <p className="mt-4 text-sm text-gray-500">(Click to return to our mission)</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Stat;
