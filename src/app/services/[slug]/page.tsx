"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { services } from '@/constants/data';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ServiceProps } from '@/types/index';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Star, Users, Target, Award, CheckCircle, Clock, DollarSign, Zap, Search, FileText, Code, Rocket } from 'lucide-react';

const slideIn = (direction: 'left' | 'right' | 'center'): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
    y: direction === 'center' ? 50 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'linear',
    },
  },
});

function ServicesPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const service = services.find((s) => s.slug === resolvedParams.slug);
  const router = useRouter();
  if (!service) return notFound();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
   </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 md:px-16 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Star size={16} />
                  {service.headline}
                </motion.div>

                                 <motion.h1
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.6, delay: 0.3 }}
                   className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight"
                 >
                   {service.small_description.split(' ').map((word, index) => (
                     <span key={index} className="inline-block">
                       {index === 0 ? (
                         <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                           {word}
                         </span>
                       ) : (
                         word
                       )}
                       {' '}
                     </span>
                   ))}
                 </motion.h1>

                 <motion.p
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.6, delay: 0.4 }}
                   className="text-lg text-gray-600 leading-relaxed"
                 >
            {service.description}
                 </motion.p>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={service.button1}>
                      <Button 
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Get in touch
                        <ArrowRight size={18} className="ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={service.button2 || '/services'}>
                      <Button 
                        variant="outline"
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
                      >
                        Start Now
                        <ArrowRight size={18} className="ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
    <Image
      src={service.image}
                    alt="Service showcase"
                    className="w-full h-auto object-cover"
                    width={600}
                    height={400}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                {/* Floating Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                </motion.div>
              </motion.div>
  </div>
</div>
        </section>

        {/* Partners Section */}
        {/* <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="px-6 md:px-16 py-16 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We work with leading companies across various industries to deliver exceptional results.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center items-center gap-8 md:gap-12 flex-wrap"
            >
              {service.partners?.map((partner, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="group cursor-pointer"
                >
                  <img
            src={partner.path}
            alt={partner.alt}
                    className="h-12 w-auto opacity-70 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
            onClick={() => partner.link && window.open(partner.link, '_blank')}
          />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section> */}

        {/* Features Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="px-6 md:px-16 py-20"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Target size={16} />
                Why Choose Us
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {service.second_headline}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {service.second_description}
              </p>
            </motion.div>

                         <motion.div
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
               {/* First Row - 3 cards */}
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.5 }}
                 viewport={{ once: true }}
                 whileHover={{ scale: 1.02, y: -5 }}
                 className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden"
               >
                 <div className="relative mb-6">
                   <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                     <Image
                       src={service.cards[0].icon}
                       alt={service.cards[0].title}
                       width={32}
                       height={32}
                       className="text-white"
                     />
                   </div>
                   <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-4">{service.cards[0].title}</h3>
                 <p className="text-gray-600 leading-relaxed">{service.cards[0].description}</p>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.6 }}
                 viewport={{ once: true }}
                 whileHover={{ scale: 1.02, y: -5 }}
                 className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden"
               >
                 <div className="relative mb-6">
                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                     <Image
                       src={service.cards[1].icon}
                       alt={service.cards[1].title}
                       width={32}
                       height={32}
                       className="text-white"
                     />
      </div>
                   <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-4">{service.cards[1].title}</h3>
                 <p className="text-gray-600 leading-relaxed">{service.cards[1].description}</p>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.7 }}
                 viewport={{ once: true }}
                 whileHover={{ scale: 1.02, y: -5 }}
                 className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden"
               >
                 <div className="relative mb-6">
                   <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                     <Image
                       src={service.cards[2].icon}
                       alt={service.cards[2].title}
                       width={32}
                       height={32}
                       className="text-white"
                     />
              </div>
                   <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-4">{service.cards[2].title}</h3>
                 <p className="text-gray-600 leading-relaxed">{service.cards[2].description}</p>
               </motion.div>

               {/* Second Row - 1 card */}
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.8 }}
                 viewport={{ once: true }}
                 whileHover={{ scale: 1.02, y: -5 }}
                 className="group bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden md:col-span-2 lg:col-span-3"
               >
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                   <div>
                     <div className="relative mb-6">
                       <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                         <Image
                           src={service.cards[3].icon}
                           alt={service.cards[3].title}
                           width={32}
                           height={32}
                           className="text-white"
                         />
            </div>
                       <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
                     <h3 className="text-xl font-bold text-white mb-4">{service.cards[3].title}</h3>
                     <p className="text-white/90 leading-relaxed mb-6">
                {service.cards[3].description}
                <br /><br />
                Leverage global time zones to keep your projects moving around the clock.
              </p>
                     <motion.div
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                         Contact Us
                         <ArrowRight size={18} className="ml-2" />
                       </Button>
                     </motion.div>
            </div>
                   <div className="relative">
                     <div className="w-full h-64 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                       <Zap className="text-white text-6xl" />
          </div>
        </div>
      </div>
               </motion.div>
             </motion.div>
          </div>
                 </motion.section>

         {/* Process Section */}
         <motion.section
           initial={{ y: 50, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="px-6 md:px-16 py-20 bg-gradient-to-br from-gray-50 to-white"
         >
           <div className="max-w-6xl mx-auto">
             <motion.div
               initial={{ y: 30, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true }}
               className="text-center mb-16"
             >
               <motion.div
                 initial={{ scale: 0, opacity: 0 }}
                 whileInView={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 0.5, delay: 0.3 }}
                 viewport={{ once: true }}
                 className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
               >
                 <Target size={16} />
                 Our Process
               </motion.div>

               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                 How We Deliver Excellence
  </h2>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                 Our proven methodology ensures consistent, high-quality results for every project.
               </p>
             </motion.div>

             <motion.div
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
             >
                               {[
                  {
                    step: "01",
                    title: "Discovery",
                    description: "We analyze your requirements and understand your business goals to create a tailored solution.",
                    icon: <Search className="text-white text-2xl" />,
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    step: "02", 
                    title: "Planning",
                    description: "Our team develops a comprehensive strategy and project roadmap with clear milestones.",
                    icon: <FileText className="text-white text-2xl" />,
                    color: "from-green-500 to-green-600"
                  },
                  {
                    step: "03",
                    title: "Development", 
                    description: "We build your solution using cutting-edge technologies and best practices.",
                    icon: <Code className="text-white text-2xl" />,
                    color: "from-orange-500 to-orange-600"
                  },
                  {
                    step: "04",
                    title: "Delivery",
                    description: "We deploy your solution and provide ongoing support to ensure success.",
                    icon: <Rocket className="text-white text-2xl" />,
                    color: "from-purple-500 to-purple-600"
                  }
                ].map((process, index) => (
        <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden"
                  >
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors duration-300">
                      {process.step}
                    </div>

                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${process.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        {process.icon}
                      </div>
                      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${process.color.replace('to-', 'to-')}/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{process.description}</p>
                    </div>

                    {/* Connecting Line */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform -translate-y-1/2"></div>
                    )}
        </motion.div>
    ))}
             </motion.div>
           </div>
         </motion.section>

         
  </div>
    </div>
  );
}

export default ServicesPage;
        

