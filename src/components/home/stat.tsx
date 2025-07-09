'use client';
import React from 'react';

function Stat() {
  return (
    <div className="bg-accent w-screen grid grid-cols-1 md:grid-cols-2 px-6 md:px-28 py-5 gap-20 justify-between mb-24">
     
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
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-2 text-secondary">Our Mission</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We aim to revolutionize our industry by focusing on sustainable innovation,
            empowering businesses, and delivering lasting impact.
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default Stat;
