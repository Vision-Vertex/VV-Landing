'use client';
import React from 'react';

function Stat() {
  return (
    <div className="bg-accent w-screen grid grid-cols-1 md:grid-cols-2 px-4 md:px-14 py-5  md:py-10 md:gap-20 justify-between mb-24">
     
      <div>
        <div className="text-4xl lg:text-4xl md:text-2xl">
          Helping local & international{' '}
          <span className="text-secondary">business reinvent themselves</span>
        </div>
        <div className='md:text-sm lg:text-base text-base'>We reached here with our hard work and dedication</div>
      </div>

      <div className="flex justify-start items-center mt-10 md:mt-0">
        <div className="min-w-full md:max-w-md bg-white rounded-xl shadow-xl p-6">
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
