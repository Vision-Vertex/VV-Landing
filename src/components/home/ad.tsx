import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

function ad() {
  return (
    <div className="bg-primary  rounded-3xl flex items-center text-sm justify-between px-10 py-5 w-10/12 mx-auto my-10">
      <div>
        <div className="text-secondary font-bold uppercase">Join Us Now</div>
        <div className='text-white'>Ready to get our services?</div>
      </div>
      <div>
        <Button variant="secondary">
          <Link href="/contact">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}

export default ad;
