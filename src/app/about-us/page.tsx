'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Picture1 from '../../../public/assets/team/image 9.png';
import Picture2 from '../../../public/assets/team/image.png';
import { Button } from '@/components/ui/button';
import { company_values, team } from '@/constants/data';
import { BsEnvelopeAtFill, BsLinkedin } from 'react-icons/bs';

function AboutUsPage() {
 return (
   <div className="px-6 md:px-16 py-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <Image src={Picture1} alt="Picture1" className="hidden md:block" />
        <div className="text-sm space-y-4">
          <div className="text-secondary uppercase font-bold">
            It started with a vision
          </div>
          <div>
            <p>Our story began with five friends—seasoned IT professionals from
            diverse fields like scientific research, HR, and accounting, with
            experience across both government and private sectors. What brought
            us together was a shared purpose: to solve a problem we saw in our
            own communities. Too many students were graduating with technical
            degrees but struggling to land their first job as developers. The
            gap between education and real-world employment was wide, and we set
            out to close it.</p>
          </div>
          <div>
            <p>We started by offering affordable training programs and
            scholarships, equipping aspiring developers with job readiness
            workshops, technical interview preparation, and guidance for
            stepping into their first roles. As our impact grew, so did our
            ambition. To scale our efforts and reach more people, we founded
            Vision5 Tech LLC, launching professional Microsoft 365 training
            programs for individuals & organizations.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 -mt-20 ">
        <div className="mt-20 hidden md:block">
          <div className="w-20 h-28 bg-primary mx-auto"></div>
          <div className="text-center text-primary uppercase font-bold text-5xl mt-2">
            About Us
          </div>
        </div>
        <Image src={Picture2} alt="Picture2" className="hidden md:block" />
        <div className="text-sm space-y-4 mt-32 md:mt-3">
          <div>
           <p> Recognizing the untapped potential of global talent, we expanded our
            focus to cultivating skilled developers in Ethiopia and India,
            connecting them with guided job opportunities. What began with small
            freelance projects evolved into a thriving outsourcing operation,
            offering services in cloud computing, full-stack development, AI
            solutions, automation, and more.</p>
          </div>

          <div>
           <p> Today, Vision5 Tech operates as a lean, global team across the
            United States, Ethiopia, and India. We continue to provide
            accessible, high-quality technical training and consultation while
            delivering scalable, cost-effective technology solutions for clients
            in the U.S. and beyond.</p>
          </div>
          <Button>
            <Link href="/contact-us">Book Us Now</Link>
          </Button>
        </div>
      </div>


      {/* Company Values with Custom Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 mt-8">
        {company_values.map((value) => {
          const bgColor =
            value.title.toLowerCase() === 'mission'
              ? 'bg-[#17215c]'
              : value.title.toLowerCase() === 'vision'
              ? 'bg-[#f45929]'
              : 'bg-primary';

          return (
            <div key={value.title} className={`${bgColor} p-8 rounded-lg shadow-lg transition-colors duration-300`}>
              <h3 className="text-white uppercase font-bold">{value.title}</h3>
              <h4 className="text-white text-2xl mb-2">{value.small_description}</h4>
              <p className="text-white/90 text-sm">{value.description}</p>
            </div>
          );
        })}
      </div>
      {/* Team Section */}
      <div>
        <h2 className="text-center text-primary uppercase font-bold text-3xl mb-2 mt-8">Meet Our Team</h2>
        <p className="text-center text-primary/80 mb-10 text-sm w-full md:w-2/3 mx-auto">
          Here are the people who make it all happen...
        </p>

        <div
          className="flex flex-col sm:flex-row sm:overflow-x-auto sm:snap-x snap-mandatory px-4 py-6 gap-6 max-w-full sm:max-w-6xl mx-auto no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {team.map((member, index) => (
            <div
              key={index}
              className="min-w-[260px] sm:min-w-[240px] bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition-transform duration-300"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-primary">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center space-y-1">
                <div className="text-sm text-gray-800 font-medium">{member.name}</div>
                <div className="text-xs text-gray-500">{member.position}</div>
              </div>
              <div className="mt-3 flex justify-center gap-4">
                <Link href={member.linkedin} target="_blank">
                  <BsLinkedin className="text-blue-600 text-xl hover:text-blue-800 transition" />
                </Link>
                <Link href={`mailto:${member.email}`} target="_blank">
                  <BsEnvelopeAtFill className="text-gray-600 text-xl hover:text-gray-800 transition" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar on Chrome */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default AboutUsPage;
