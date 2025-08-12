'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { navItems } from '@/constants/data';
import Logo from '../../../public/logos/VisionVertexLogo1.svg';
import VisionLogo from '../../../public/logos/vision.svg';

export default function NavigationMenuDemo() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className={cn(
      "flex justify-between items-center w-full p-4 md:px-14 md:py-7 relative z-50",
      isHomePage ? "hidden" : "bg-white"
    )}>
      <Link href={'/'}>
        <Image className='' src={Logo} width={110} height={110} alt="Logo" />
        
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-10">
        <nav className="flex items-center gap-6">
          {navItems.map((navitem) =>
            navitem.link ? (
              <Link
                key={navitem.title}
                href={navitem.href}
                className="text-gray-800 hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {navitem.title}
              </Link>
            ) : (
              <div key={navitem.title} className="relative group">
                <button className="text-gray-800 hover:text-primary transition-colors duration-200 text-sm font-medium flex items-center gap-1">
                  {navitem.title}
                  <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-3 w-64 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                  <ul className="py-2 space-y-2 w-full">
                    {navitem.components?.map((component: any, index: number) => (
                      <li key={`${navitem.title}-${component.service_name}-${index}`}>
                        <Link
                          href={component.href}
                          className="block p-3 rounded-lg hover:bg-primary text-gray-600 hover:text-white transition-colors duration-200"
                        >
                          <p className="text-xs mt-1">{component.service_name}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          )}
        </nav>
        <Button variant={'default'}>
          <Link href={'/contact-us'}>Contact Us</Link>
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="sm:hidden text-gray-800 hover:text-primary transition-colors duration-200 p-2"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Dropdown */}
      <div
        className={cn(
          "absolute top-full left-4 right-4 mt-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl sm:hidden overflow-hidden z-[100]",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary/30 rounded-full"></div>
        
        <div className="p-6 space-y-6">
          {navItems.map((navitem) => (
            <div key={navitem.title} className="group">
              {navitem.link ? (
                <Link
                  href={navitem.href}
                  className="flex items-center gap-3 text-gray-800 hover:text-primary transition-colors duration-200 text-base font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-2 h-2 bg-primary/30 rounded-full group-hover:bg-primary transition-colors duration-200"></div>
                  {navitem.title}
                </Link>
              ) : (
                <div>
                  <div className="flex items-center gap-3 text-gray-800 font-semibold text-base mb-3 group-hover:text-secondary/90 transition-colors duration-200">
                    <div className="w-2 h-2 bg-secondary/40 rounded-full group-hover:bg-secondary transition-colors duration-200"></div>
                    {navitem.title}
                  </div>
                  <div className="pl-5 space-y-3">
                    {navitem.components?.map((component: any, index: number) => (
                      <div key={`${navitem.title}-${component.service_name}-${index}`}>
                        <Link
                          href={component.href}
                          className="block text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {component.service_name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-4 border-t border-gray-200/30">
            <Button 
              variant={'outline'} 
              className="w-full border-primary text-primary bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary hover:to-secondary hover:text-white backdrop-blur-sm transition-colors duration-200 shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={'/contact-us'} className="flex items-center gap-2">
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


