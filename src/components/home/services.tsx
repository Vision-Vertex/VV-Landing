"use client";
import React from "react";
import { motion } from "framer-motion";
import { services } from "@/constants/data";
import Image from "next/image";
import { SectionTag } from "../ui/section-tag";
import { SectionTitle } from "../ui/section-title";
import { LearnMoreLink } from "../ui/learn-more-link";
import {
  ShoppingCart,
  FileText,
  Code2,
  Palette,
  Cloud,
  GitBranch,
  Database,
  Brain,
  GraduationCap,
  Users,
  LucideIcon,
  Sparkles
} from "lucide-react";

// Direct mapping of card titles to icons
const iconMap: Record<string, LucideIcon> = {
  "Procurement & Vendor Management": ShoppingCart,
  "License Management & Sales": FileText,
  "Full-Stack Development": Code2,
  "UI/UX Design & Prototyping": Palette,
  "Cloud Infrastructure Management": Cloud,
  "CI/CD Pipelines & Automation": GitBranch,
  "Data Engineering & Analytics": Database,
  "Machine Learning & AI Solutions": Brain,
  "Technical Training & Upskilling": GraduationCap,
  "Internship & Shadowing Programs": Users,
};

const getIconForCard = (title: string): LucideIcon => {
  return iconMap[title] || Sparkles;
};

interface CardIconProps {
  title: string;
}

function CardIcon({ title }: CardIconProps) {
  const IconComponent = getIconForCard(title);
  
  return (
    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/20 transition-all duration-300 group-hover/card:shadow-primary/40 group-hover/card:scale-110">
      <IconComponent size={18} strokeWidth={2} className="text-white" />
    </div>
  );
}

function ServicesList() {
  const featured = services[0];
  const gridServices = services.slice(1);

  const blurDataURL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  return (
    <section id="services" className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-14">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SectionTag>What We Offer</SectionTag>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <SectionTitle as="h1" accent="Solutions">
              End-to-End Technology
            </SectionTitle>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From software engineering to AI &amp; data science, our specialized
            services deliver comprehensive solutions that drive innovation and
            business growth.
          </motion.p>
        </motion.div>

        {/* Featured card — full width */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] min-h-[440px] p-6 md:p-8 mb-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="flex flex-col order-2 lg:order-1">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  {featured.headline}
                </h2>

                <p className="text-[15px] leading-relaxed text-gray-500 mb-6">
                  {featured.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {featured.cards?.slice(0, 2).map((card, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 group/card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                    >
                      <CardIcon title={card.title} />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {card.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <LearnMoreLink href={`/services/${featured.slug}`} />
              </div>

              <div className="relative overflow-hidden rounded-2xl order-1 lg:order-2 min-h-[300px] lg:min-h-[380px]">
                <Image
                  src={featured.image}
                  alt={featured.headline}
                  width={600}
                  height={400}
                  className="w-full h-full min-h-[300px] lg:min-h-[380px] object-cover rounded-2xl"
                  priority
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Cards 2–5 — 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {gridServices.map((service, index) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] min-h-[500px]"
            >
              <div className="relative w-full shrink-0 overflow-hidden rounded-t-2xl">
                <Image
                  src={service.image}
                  alt={service.headline}
                  width={600}
                  height={400}
                  className="w-full h-[280px] md:h-[340px] object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-2xl"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2">
                  {service.headline}
                </h3>

                <p className="text-[15px] leading-relaxed text-gray-500 mb-4">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {service.cards?.slice(0, 2).map((card, cardIndex) => (
                    <motion.div
                      key={cardIndex}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300 group/card"
                    >
                      <CardIcon title={card.title} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm group-hover/card:text-primary transition-colors duration-200">
                          {card.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                          {card.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <LearnMoreLink href={`/services/${service.slug}`} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesList;