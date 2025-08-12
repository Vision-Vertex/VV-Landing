'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Picture1 from '../../../public/assets/team/image 9.png';
import Picture2 from '../../../public/assets/team/image.png';
import { Button } from '@/components/ui/button';
import { company_values, team } from '@/constants/data';
import { BsEnvelopeAtFill, BsLinkedin } from 'react-icons/bs';
import { Star, Users, Target, Award } from 'lucide-react';

function AboutUsPage() {
 return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
          </div>

      <div className="relative z-10 px-6 md:px-16 py-16 space-y-20">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Star size={16} />
            Our Story
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            About{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Vision Vertex Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From a shared vision to a global technology company, we're transforming how businesses and individuals approach digital innovation.
          </motion.p>
        </motion.div>

        {/* Story Section 1 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={Picture1} 
                alt="Our Journey Begins" 
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100"
            >
              <div className="text-center">
                <div className="text-lg font-bold text-primary">2019</div>
                <div className="text-xs text-gray-600">Founded</div>
          </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium"
            >
              <Target size={16} />
              It started with a vision
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Bridging the Gap Between Education and Employment
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 text-gray-600 leading-relaxed"
            >
              <p>
                Our story began with five friends—seasoned IT professionals from diverse fields like scientific research, HR, and accounting, with experience across both government and private sectors. What brought us together was a shared purpose: to solve a problem we saw in our own communities.
              </p>
              <p>
                Too many students were graduating with technical degrees but struggling to land their first job as developers. The gap between education and real-world employment was wide, and we set out to close it.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Story Section 2 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 lg:order-2"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4 text-gray-600 leading-relaxed"
            >
              <p>
                We started by offering affordable training programs and scholarships, equipping aspiring developers with job readiness workshops, technical interview preparation, and guidance for stepping into their first roles.
              </p>
              <p>
                As our impact grew, so did our ambition. To scale our efforts and reach more people, we founded Vision Vertex Solutions LLC, launching professional Microsoft 365 training programs for individuals & organizations.
              </p>
              <p>
                Recognizing the untapped potential of global talent, we expanded our focus to cultivating skilled developers in Ethiopia and India, connecting them with guided job opportunities.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact-us" className="flex items-center gap-2">
                  Book Us Now
                  <Award size={18} />
                </Link>
          </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={Picture2} 
                alt="Global Expansion" 
                className="w-full h-auto object-cover"
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
                <div className="text-lg font-bold text-primary">3</div>
                <div className="text-xs text-gray-600">Countries</div>
      </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mission & Vision Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {company_values.map((value, index) => {
    const lowerTitle = value.title.toLowerCase();
            const isMission = lowerTitle === 'mission';
            const isVision = lowerTitle === 'vision';

    return (
              <motion.div
        key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`relative p-8 rounded-3xl shadow-xl transition-all duration-300 overflow-hidden ${
                  isMission 
                    ? 'bg-gradient-to-br from-primary to-primary/90' 
                    : isVision 
                    ? 'bg-gradient-to-br from-secondary to-secondary/90'
                    : 'bg-gradient-to-br from-gray-800 to-gray-900'
                }`}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1 rounded-full text-xs font-medium mb-4"
                  >
                    {isMission ? <Target size={14} /> : <Award size={14} />}
                    {value.title}
                  </motion.div>

                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
                    {value.small_description}
                  </h3>
                  
                  <p className="text-white/90 text-sm leading-relaxed">
                    {value.description}
                  </p>
      </div>
              </motion.div>
    );
  })}
        </motion.div>

      {/* Team Section */}
        {/* <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Users size={16} />
            Our Team
          </motion.div>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Meet Our{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Team
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Here are the people who make it all happen. Our diverse team brings together expertise from around the world to deliver exceptional results.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {team.map((member, index) => (
              <motion.div
              key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -8 }}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden"
              >
                
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tl from-secondary/5 to-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                
                <div className="relative mb-8">
                  <div className="relative w-40 h-40 mx-auto">
                    
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary p-1 animate-spin-slow">
                      <div className="w-full h-full rounded-full bg-white"></div>
                    </div>
                    
                    <div className="absolute inset-2 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                        width={144}
                        height={144}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
                    
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                
                <div className="relative z-10 text-center space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl group-hover:text-primary transition-colors duration-300 mb-2">
                      {member.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {member.position}
                    </div>
              </div>

                  
                  <div className="flex justify-center gap-4 pt-4">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="group/social"
                    >
                <Link href={member.linkedin} target="_blank">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full shadow-lg group-hover/social:shadow-xl transition-all duration-300">
                          <BsLinkedin className="text-white text-lg" />
                        </div>
                </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="group/social"
                    >
                <Link href={`mailto:${member.email}`} target="_blank">
                        <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-3 rounded-full shadow-lg group-hover/social:shadow-xl transition-all duration-300">
                          <BsEnvelopeAtFill className="text-white text-lg" />
                        </div>
                </Link>
                    </motion.div>
        </div>
      </div>

               
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div> */}
      </div>
    </div>
  );
}

export default AboutUsPage;
