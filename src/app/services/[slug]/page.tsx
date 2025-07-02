"use client";
import React from 'react';
import { services } from '@/constants/data';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ServiceProps } from '@/types/index';
import { Button } from '@/components/ui/button';

function ServicesPage({ params }: ServiceProps) {
  const service = services.find((s) => s.slug === params.slug);
  const router = useRouter();
  if (!service) return notFound();

  return (
    <div className="font-sans bg-white min-h-screen py-6 md:py-10">
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-center max-w-6xl mx-auto gap-8 px-4">
        <div className="flex-1 min-w-[0] md:min-w-[320px] max-w-[540px] w-full">
          <div className="text-[#F26522] font-semibold text-[15px] mb-2">{service.headline}</div>
          <h1 className="text-[#1A2669] font-bold text-3xl md:text-4xl mb-4 leading-tight">
            {service.small_description}
          </h1>
          <p className="text-[#222] text-base mb-6">
            {service.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
            <button className="bg-[#1A2669] text-white rounded-lg px-6 py-2 font-semibold text-base hover:bg-[#16205a] transition w-full sm:w-auto" onClick={() => router.push(service.button1)}>Get in touch</button>
            <button className="text-[#F26522] font-semibold text-base hover:underline w-full sm:w-auto">Start Now &gt;</button>
          </div>
        </div>
        <div className="flex-1 min-w-[0] md:min-w-[320px] max-w-[420px] w-full flex justify-center">
          <img src={service.image} alt="Team working" className="w-full rounded-xl object-cover h-[220px] sm:h-[260px] md:h-[300px]" />
        </div>
      </div>
      <div className="flex justify-center items-center gap-6 md:gap-8 mt-10 md:mt-12 mb-6 md:mb-8 flex-wrap">
        {service.partners?.map((partner,i) => (
          <img
            key={i}
            src={partner.path}
            alt={partner.alt}
            className="h-8 w-auto opacity-90"
            onClick={() => partner.link && window.open(partner.link, '_blank')}
          />
        ))}
      </div>
      <div className="text-center max-w-3xl mx-auto px-4 mb-8">
        <h2 className="text-[#1A2669] font-bold text-2xl md:text-3xl mb-2">{service.second_headline}</h2>
        <p className="text-[#222] text-base">{service.second_description}</p>
      </div>
      <div className="p-3 md:p-6 bg-white max-w-6xl mx-auto px-2 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[456px]">
          <div className="md:col-span-2 grid grid-rows-2 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#E1EAF9] p-4 md:p-6 rounded-lg">
                <div className="text-red-500 text-2xl mb-2">💰</div>
                <h3 className="font-bold text-lg mb-2">{service.cards[0].title}</h3>
                <p className="text-sm text-gray-700">
                  {service.cards[0].description}
                </p>
              </div>
              <div className="bg-[#E1EAF9] p-4 md:p-6 rounded-lg">
                <div className="text-orange-500 text-2xl mb-2">👥</div>
                <h3 className="font-bold text-lg mb-2">{service.cards[1].title}</h3>
                <p className="text-sm text-gray-700">
                  {service.cards[1].description}
                </p>
              </div>
            </div>
            <div className="bg-[#E1EAF9] p-4 md:p-6 rounded-lg">
              <div className="text-orange-500 text-2xl mb-2">📝</div>
              <h3 className="font-bold text-lg mb-2">{service.cards[2].title}</h3>
              <p className="text-sm text-gray-700">
                {service.cards[2].description}
              </p>
            </div>
          </div>
          <div className="bg-[#E1EAF9] p-4 md:p-6 rounded-lg flex flex-col h-full">
            <div className='mb-6 md:mb-10'>
              <div className="text-orange-500 text-2xl mb-2">💰</div>
              <h3 className="font-bold text-lg mb-2">{service.cards[3].title}</h3>
              <p className="text-sm text-gray-700">
                {service.cards[3].description}
                <br /><br />
                Leverage global time zones to keep your projects moving around the clock.
              </p>
            </div>
            <Button className='bg-primary text-white w-fit text-md rounded-2xl px-6 w-36 md:w-44 mt-auto' variant={'outline'}>Contact Us </Button>
          </div>
        </div>
      </div>
      <div className="px-2 md:px-6 py-8 bg-white max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8">Case Studies</h2>
        <div className="bg-primary text-white rounded-2xl px-4 md:px-6 py-10 md:py-20 flex flex-col md:flex-row justify-between gap-6 md:gap-0">
          <div className="md:w-1/3 text-sm leading-relaxed px-2 md:px-6">
            For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.
          </div>
          <div className="hidden md:block w-px bg-secondary mx-6" />
          <div className="md:w-1/3 text-sm leading-relaxed px-2 md:px-6">
            For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.
          </div>
          <div className="hidden md:block w-px bg-secondary mx-6" />
          <div className="md:w-1/3 text-sm leading-relaxed px-2 md:px-6">
            For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
        
