'use client';
import React, { useState, useEffect, useRef } from 'react';
import { services } from '@/constants/data';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

function ServicesList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    const updateSectionHeight = () => {
      setSectionHeight(window.innerHeight);
    };

    updateSectionHeight();
    window.addEventListener('resize', updateSectionHeight);
    return () => window.removeEventListener('resize', updateSectionHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY - containerRef.current.offsetTop;
      const index = Math.min(
        services.length - 1,
        Math.max(0, Math.floor(scrollTop / sectionHeight))
      );
      if (index !== activeIndex) setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, services.length, sectionHeight]);

  const handleIconClick = (index: number) => {
    if (!containerRef.current) return;
    window.scrollTo({
      top: containerRef.current.offsetTop + index * sectionHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={containerRef}
      style={{ height: `${services.length * sectionHeight}px` }}
      className="relative"
    >
      <div className="sticky top-0 min-h-screen bg-white flex items-center justify-center px-4 md:px-14 py-10 z-10">
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-primary font-bold mb-6 text-left">
            Our Services
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left */}
            <div className="col-span-12 md:col-span-6 flex flex-col gap-4 md:row-start-1">
              <div className="flex items-center gap-2">
                <div className="bg-primary w-2 h-5" />
                <div className="text-secondary font-medium text-sm sm:text-base">
                  {services[activeIndex].headline}
                </div>
                              
              </div>
<div className="w-full md:hidden">
                <Image
                  src={services[activeIndex].image}
                  alt={services[activeIndex].headline}
                  className="w-full h-full rounded-xl object-cover"
                  width={600}
                  height={400}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-primary text-sm sm:text-base px-2 leading-relaxed text-left break-words">
                  {services[activeIndex].small_description}
                </div>

                <div className="text-sm text-gray-700 leading-relaxed px-2 text-left break-words">
                  {services[activeIndex].description}
                </div>

                <Button variant="link" className="p-0 w-fit">
                  <Link
                    href={`/services/${services[activeIndex].slug}`}
                    className="flex items-center gap-2 text-sm sm:text-base"
                  >
                    Learn More <ChevronRight size={18} />
                  </Link>
                </Button>
              </div>

              {/* Icons */}
              <div className="flex flex-wrap gap-4 mt-6">
                {services.map((serv, index) => (
                  <div
                    key={index}
                    onClick={() => handleIconClick(index)}
                    className={`cursor-pointer transition-all duration-200 flex items-center justify-center rounded-lg p-2 ${
                      activeIndex === index
                        ? 'scale-110 bg-primary shadow-lg'
                        : 'scale-100 bg-gray-100'
                    }`}
                    style={{ width: 48, height: 48 }}
                  >
                    <Image
                      src={serv.icon}
                      alt={serv.headline}
                      className={`object-contain w-[36px] h-[36px] transition-all duration-200 ${
                        activeIndex === index ? 'opacity-100' : 'opacity-60'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

           
            <div className="col-span-10 md:col-span-6 flex md:row-start-1 justify-center hidden md:block">
              <div className="md:w-[600px] md:h-[400px] ">
                <Image
                  src={services[activeIndex].image}
                  alt={services[activeIndex].headline}
                  className="w-full h-full rounded-xl object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesList;
