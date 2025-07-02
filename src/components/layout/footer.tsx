import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer(){

  return (
    <footer className="bg-primary text-gray-300">
      {/* Top section */}
      <div className=" mx-auto  py-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0">
        {/* About */}
        <div className='flex flex-col items-center md:pl-14'>
            <div className='flex flex-col items-start'>
          {/* <h2 className="text-white text-lg font-semibold mb-4">Vision5 Tech</h2> */}
          <div className='bg-primary  h-12 w-full'></div>
          <p className="text-xs leading-relaxed">
            At Vision5 Tech, we help businesses cut costs and scale faster with expert offshore
            development teams and tailored technology solutions. From Microsoft Power Platform
            to secure full stack development, we deliver innovation you can trust — at a fraction
            of the cost.
          </p>
        </div>
        </div>

        {/* Services list */}
        <div  className='flex flex-col md:items-center '>
          <div className='flex flex-col items-start'><h3 className="text-white text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-xs">
            <li>Offshore Development Teams</li>
            <li>Microsoft Power Platform Solutions</li>
            <li>Full Stack Agile Development</li>
            <li>DevSecOps &amp; Secure Development</li>
            <li>Training &amp; Upskilling (Microsoft 365)</li>
          </ul>
          </div>
        </div>

        {/* Socials */}
        <div  className='flex flex-col md:items-center'>
          <h3 className="text-white text-lg font-semibold mb-4">Our Socials</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

     
      <div className="border-t border-gray-600"></div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Use
          </a>
        </div>
        <div>
          © {new Date().getFullYear()} All Rights Reserved
        </div>
      </div>
    </footer>
  );
};


