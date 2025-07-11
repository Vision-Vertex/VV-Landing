'use client';
import React, {useRef, useState, useEffect} from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import TestmonialIcon from '../../../public/assets/Group 1000001788.svg';
import { testmonial as testimonialList } from '@/constants/data';


function testmonial() {
    const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollX = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth;
    const index = Math.round(scrollX / width);
    setActiveIndex(index);
  };


  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-4 md:px-14  items-center">
      <div className="space-y-6 min-h-[20rem] md:min-h-[25rem] ">
        <div className="font-medium text-secondary uppercase">Testimonials</div>
        <h2 className="text-4xl text-primary font-semibold leading-tight">
          See what our client have to say about us
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the great
          explorer of the truth, the master-builder of human happiness. No one
          rejects, dislikes, or avoids pleasure itself, because it is pleasure,
          but because those who do not know how to pursue pleasure rationally
          encounter consequences that are extremely painful.
        </p>
        <Button variant="secondary">Become our client</Button>
      </div>

      <div className="relative w-full h-[30rem] min-h-[20rem] min-w-[10rem] overflow-hidden">
        <Image
          src={TestmonialIcon}
          alt="Testimonial Background"
          fill
          style={{ objectFit: 'cover' }}
          className="-z-10"
        />

        <div className="relative px-12 py-8 md:px-8 md:py-12">
  <div
       ref={scrollRef}
        onScroll={handleScroll}
         className="flex gap-8 overflow-x-auto px-4" style={{scrollbarWidth:"none"}}>
          
    {testimonialList.map((testimonial, index) => (
      <div key={index} className="flex items-start gap-4 max-w-[90%] ml-10 flex-shrink-0">
        <div className="hidden md:flex flex-col items-center">
          <Image
            src={testimonial.image}
            alt="Client Avatar"
            className="bg-white rounded-full shadow-md mb-4 object-fill "
          />
          <div className="h-30 w-1 bg-secondary"></div>
        </div>

        <div
          className="text-white text-sm leading-relaxed max-w-full max-h-[10rem] overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <p className="italic">"{testimonial.quote}"</p>
          <p className="text-secondary text-right font-bold mt-4">– {testimonial.name}</p>
        </div>
      </div>

    ))}
  </div>
<div className="flex justify-center mt-2 space-x-2">
            {testimonialList.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-secondary' : 'bg-accent'
                }`}
              />
            ))}
          </div>
      </div>
    </div>
    </div>
  );
}

export default testmonial;

