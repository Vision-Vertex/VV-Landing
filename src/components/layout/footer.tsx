import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Image from 'next/image'; 
import VisionVertex from '../../../public/logos/VisionVertexLogo2.svg';

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start text-sm">
        
        {/* Column 1: Logo and Description */}
        <div>
          <Image
            src={VisionVertex}
            width={200}
            height={200}
            alt="Vision5 Tech Logo"
            className="mb-4"
          />
          <p className="text-xs leading-relaxed max-w-[260px]">
            At Vision vertex Tech, we help businesses cut costs and scale faster with expert offshore
            development teams and tailored technology solutions.
          </p>
        </div>

        {/* Column 2: Services */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-xs">
            <li>Offshore Development Teams</li>
            <li>Microsoft Power Platform Solutions</li>
            <li>Full Stack Agile Development</li>
            <li>DevSecOps &amp; Secure Development</li>
            <li>Training &amp; Upskilling (Microsoft 365)</li>
          </ul>
        </div>

        {/* Column 3: Socials (visible on md and up) */}
        <div className="sm:col-span-2 md:col-span-1">
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

      {/* Divider */}
      <div className="border-t border-gray-600"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 sm:grid-cols-2 text-sm gap-y-4">
        <div className="flex space-x-6 justify-center sm:justify-start">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Use</a>
        </div>
        <div className="text-center sm:text-right">
          © {new Date().getFullYear()} All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

