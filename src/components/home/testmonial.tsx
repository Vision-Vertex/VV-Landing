import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import TestmonialIcon from '../../../public/assets/Group 1000001788.svg';
import { testmonial as testimonialList } from '@/constants/data';

function testmonial() {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 gap-24 px-6 md:px-28 py-10">
      <div className="space-y-2 mt-10">
        <div className="font-medium text-secondary uppercase">Testmonials</div>
        <div className="text-4xl text-primary font-medium">
          See what our client have to say about us
        </div>
        <div className="text-sm">
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the great
          explorer of the truth, the master-builder of human happiness. No one
          rejects, dislikes, or avoids pleasure itself, because it is pleasure,
          but because those who do not know how to pursue pleasure rationally
          encounter consequences that are extremely painful.{' '}
        </div>
        <Button variant={'secondary'}>Become our client</Button>
      </div>
      <div className="relative">
        <Image
          src={TestmonialIcon}
          alt="Icon"
          className="w-full h-[40rem] absolute -z-10 md:block hidden"
          width={200}
          height={150}
        />
        <div className='flex items-center gap-6'>
          <div className="ml-28 flex flex-col items-center justify-center md:block hidden">
            <Image
              src={testimonialList[0].image}
              alt="Icon"
              width={100}
              height={100}
              className="bg-white mb-5 mt-5"
            />
            <div className="h-56 w-2 bg-secondary "></div>
          </div>
          <div className="z-40  px-5 pt-10">
            <div className="text-xs text-black  md:text-white">
              " {testimonialList[0].quote} "
            </div>
            <div className='text-sm text-secondary text-right mt-3 font-bold'> - {testimonialList[0].name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default testmonial;
