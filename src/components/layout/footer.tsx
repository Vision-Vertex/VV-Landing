import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';
import Image from 'next/image'; 
import VisionVertex from '../../../public/logos/VisionVertexLogo2.svg';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Image
                  src={VisionVertex}
                  width={180}
                  height={60}
                  alt="Vision Vertex Solutions Logo"
                  className="filter brightness-0 invert"
                />
              </div>
              <p className="text-white/80 leading-relaxed mb-6 text-sm">
                At Vision Vertex Solutions, we help businesses cut costs and scale faster with expert offshore
                development teams and tailored technology solutions.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300">
                  <Mail size={16} className="text-secondary" />
                  <span className="text-sm">info@visionvertex.tech</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300">
                  <Phone size={16} className="text-secondary" />
                  <span className="text-sm">+251-923623256</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300">
                  <MapPin size={16} className="text-secondary" />
                  <span className="text-sm">4 kilo Behind Ambassador mall in front of 4 kilo police station, Addis Ababa</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 relative">
                Our Services
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Technology Procurement & Integration Services', href: '/services/Technology-Procurement-Integration-Services' },
                  { name: 'Software Engineering & Product Delivery', href: '/services/Software-Engineering-Product-Delivery' },
                  { name: 'Cloud, DevOps & Platform Engineering', href: '/services/Cloud-DevOps-Platform-Engineering' },
                  { name: 'AI, Data Science & Business Intelligence', href: '/services/AI-Data-Science-Business-Intelligence' },
                  { name: 'Training, R&D & Talent Development', href: '/services/Training-RD-Talent-Development' }
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
                    >
                      <ArrowRight size={12} className="text-secondary group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="text-sm">{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', href: '/about-us' },
                  { name: 'Our Services', href: '/services' },
                  { name: 'Contact Us', href: '/contact-us' },
                  { name: 'Privacy Policy', href: '/privacy-policy' },
                  { name: 'Terms of Service', href: '/terms-of-service' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
                    >
                      <ArrowRight size={12} className="text-secondary group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 relative">
                Connect With Us
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary rounded-full"></div>
              </h3>
              
              <div className="mb-6">
                <p className="text-white/80 text-sm mb-4">Follow us on social media</p>
                <div className="flex gap-4">
                  {[
                    { icon: FaTwitter, href: '#', label: 'Twitter' },
                    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                    { icon: FaInstagram, href: '#', label: 'Instagram' },
                    { icon: FaGithub, href: '#', label: 'GitHub' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary hover:shadow-lg hover:shadow-white/25 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20"></div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/80">
              <span>© {currentYear} Vision Vertex Solutions. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-6 text-white/80">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-300 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors duration-300 text-sm">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors duration-300 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

