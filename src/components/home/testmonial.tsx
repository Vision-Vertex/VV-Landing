import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import TestmonialIcon from '../../../public/assets/Group 1000001788.svg';
import { testmonial as testimonialList } from '@/constants/data';

function testmonial() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-6 md:px-28  items-center">
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

        <div className="relative px-16 py-8 md:px-8 md:py-12"> 
          <div className="flex items-start gap-4  max-w-[90%] ml-10">
            <div className="hidden md:flex flex-col items-center "> 
              <Image
                src={testimonialList[0].image }
                alt="Client Avatar"
                className="bg-white rounded-full shadow-md mb-4 object-fill"
              />
              <div className="h-30 w-1 bg-secondary"></div>
            </div>

            <div className="text-white text-sm leading-relaxed max-w-full max-h-[10rem] overflow-auto" style={{scrollbarWidth: "none"}}>
              <p className="italic">"{testimonialList[0].quote}"</p>
              <p className="text-secondary text-right font-bold mt-4">
                – {testimonialList[0].name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default testmonial;
