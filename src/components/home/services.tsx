'use client';
import React, { useState, useEffect, useRef } from 'react';
import { services } from '@/constants/data';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

function ServicesList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleIconClick = (index: number) => {
    if (index === activeIndex) return;

    setFadeState('fade-out');
    setTimeout(() => {
      setActiveIndex(index);
      setFadeState('fade-in');
      if (scrollRef.current) {
        const containerHeight = scrollRef.current.clientHeight;
        scrollRef.current.scrollTo({
          top: index * containerHeight,
          behavior: 'smooth',
        });
      }
    }, 150);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / containerHeight);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < services.length) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <section className="w-full md:h-screen grid grid-cols-1 md:grid-cols-2 gap-10 p-4 md:px-14 md:py-7 items-center bg-white">
   
      <div className="h-full flex flex-col justify-center space-y-6 pr-4 overflow-hidden">
        <h1 className="text-3xl text-primary font-bold">Our Services</h1>

        <div
          className={`flex flex-col space-y-3 transition-opacity duration-300 ease-in-out max-h-[60vh] overflow-y-auto pr-2 ${
            fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="bg-primary w-2 h-5" />
            <div className="text-secondary font-medium text-lg">{services[activeIndex].headline}</div>
          </div>
          <p className="text-primary text-base">{services[activeIndex].small_description}</p>
          //text-muted-foreground
          <p className="text-sm whitespace-pre-line">
            {services[activeIndex].description}
          </p>
          <Button variant="link" className="pl-0">
            <Link href={services[activeIndex].slug} className="flex items-center gap-2">
              Learn More <ChevronRight />
            </Link>
          </Button>
        </div>

      
        <div className="hidden md:flex gap-3 overflow-y-auto max-h-[260px] pt-4 scrollbar-hide">
          {services.map((serv, index) => (
            <div
              key={index}
              onClick={() => handleIconClick(index)}
              className={`cursor-pointer flex items-center justify-center transition-all duration-200 ${
                activeIndex === index ? 'scale-110 bg-primary rounded-lg p-2 shadow-lg' : ''
              }`}
              style={{ width: 56, height: 56 }}
            >
              <Image
                src={serv.icon}
                alt={serv.headline}
                width={40}
                height={40}
                className={`transition-opacity duration-200 ${activeIndex === index ? 'opacity-100' : 'opacity-60'}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="h-[70vh] overflow-y-auto scroll-smooth relative w-full rounded-md scrollbar-hide"
        style={{
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="h-full">
          {services.map((serv, index) => (
            <div
              key={index}
              className="h-[70vh] flex items-center justify-center scroll-snap-start px-4"
              style={{
                scrollSnapAlign: 'start',
                minHeight: '100%',
              }}
            >
              <Image
                src={serv.image}
                alt={serv.headline}
                width={1400}
                height={1400}
                className="object-contain max-h-full max-w-full"
              />
            </div>
          ))}
        </div>
      </div>

     
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default ServicesList;
