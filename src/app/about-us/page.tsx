import React from 'react';
import Picture1 from '../../../public/assets/team/image 9.png';
import Picture2 from '../../../public/assets/team/image.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { company_values, team } from '@/constants/data';
import { LiaLinkedinIn } from 'react-icons/lia';
import Link from 'next/link';
import { BiEnvelope } from 'react-icons/bi';
import { BsEnvelope, BsEnvelopeAtFill, BsLinkedin } from 'react-icons/bs';

function AboutUsPage() {
  return (
    <div className="px-16 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <Image src={Picture1} alt="Picture1" className="hidden md:block" />
        <div className="text-sm space-y-4">
          <div className="text-secondary uppercase font-bold">
            It started with a vision
          </div>
          <div>
            Our story began with five friends—seasoned IT professionals from
            diverse fields like scientific research, HR, and accounting, with
            experience across both government and private sectors. What brought
            us together was a shared purpose: to solve a problem we saw in our
            own communities. Too many students were graduating with technical
            degrees but struggling to land their first job as developers. The
            gap between education and real-world employment was wide, and we set
            out to close it.
          </div>
          <div>
            We started by offering affordable training programs and
            scholarships, equipping aspiring developers with job readiness
            workshops, technical interview preparation, and guidance for
            stepping into their first roles. As our impact grew, so did our
            ambition. To scale our efforts and reach more people, we founded
            Vision5 Tech LLC, launching professional Microsoft 365 training
            programs for individuals and organizations.
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
            Recognizing the untapped potential of global talent, we expanded our
            focus to cultivating skilled developers in Ethiopia and India,
            connecting them with guided job opportunities. What began with small
            freelance projects evolved into a thriving outsourcing operation,
            offering services in cloud computing, full-stack development, AI
            solutions, automation, and more.
          </div>

          <div>
            Today, Vision5 Tech operates as a lean, global team across the
            United States, Ethiopia, and India. We continue to provide
            accessible, high-quality technical training and consultation while
            delivering scalable, cost-effective technology solutions for clients
            in the U.S. and beyond.
          </div>
          <Button>
            <Link href="/contact-us">Book Us Now</Link>
          </Button>
        </div>
      </div>
      <div className="md:h-screen flex justify-center items-center mt-10 md:mt-0 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {company_values.map((value) => (
            <div
              key={value.title}
              className="bg-primary even:bg-secondary p-10 rounded-lg "
            >
              <div className="text-secondary even:text-primary  uppercase font-bold">
                {value.title}
              </div>
              <div className="text-white mb-4 text-2xl ">
                {value.small_description}
              </div>
              <div className="text-sm text-white/80">{value.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-center text-primary uppercase font-bold text-3xl mb-2 mt-10 md:mt-0">
          Meet Our Team
        </div>
        <div className="text-center text-primary/80 mb-12 text-sm w-full md:w-2/3 mx-auto ">
          Here are the people who make it all happen. We are a team of
          passionate individuals who are dedicated to delivering the best
          possible service to our clients.{' '}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <div key={index} className="relative">
              <Image
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full bg-primary/30  px-10 py-5 flex justify-between items-center">
                <div className="space-y-2">
                  <div className="text-white text-sm">{member.position}</div>
                  <div className="text-white text-sm">{member.name}</div>
                </div>
                <div className="flex gap-4">
                  <Link href={member.linkedin} target="_blank">
                    <BsLinkedin className="text-white text-xl hover:text-white/80" />
                  </Link>
                  <Link href={`mailto:${member.email}`} target="_blank">
                    <BsEnvelopeAtFill className="text-white text-xl hover:text-white/80" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
