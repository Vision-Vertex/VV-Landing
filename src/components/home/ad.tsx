import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

function ad() {
  return (
    <div className="bg-primary  rounded-2xl sm:rounded-3xl flex items-center text-sm justify-between px-4 sm:px-10 py-3 sm:py-5  mx-auto my-20">
      <div>
        <div className="text-secondary font-bold uppercase text-xs sm:text-base">Join Us Now</div>
        <div className='text-white text-xs sm:text-base'>Ready to get our services?</div>
      </div>
      <div>
        <Button variant="secondary" className='text-white text-xs sm:text-base'>
          <Link href="/contact">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}

export default ad;
