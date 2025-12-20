"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/constants/data";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight, ArrowRight, Star, Sparkles } from "lucide-react";

function ServicesList() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="relative bg-white py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-14">
        {/* Header Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Star size={16} />
            Our Services
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From software engineering to AI & data science, our specialized
            services deliver comprehensive solutions that drive innovation and
            business growth.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div
                className={`grid gap-8 items-center ${
                  index === 0 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
                }`}
              >
                {/* Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <Image
                        src={service.icon}
                        alt={service.headline}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </motion.div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                        {service.headline}
                      </h2>
                      <p className="text-primary font-medium text-sm">
                        Premium Service
                      </p>
                    </div>
                  </div>

                  {/* Image - Only for 2-column cards (not first card) */}
                  {index !== 0 && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src={service.image}
                          alt={service.headline}
                          width={400}
                          height={250}
                          className="w-full object-cover"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Floating Stats */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100"
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            100%
                          </div>
                          <div className="text-xs text-gray-600">
                            Success Rate
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  <p className="text-gray-600 leading-relaxed">
                    {service.description.length > 100
                      ? service.description.substring(0, 100) + "..."
                      : service.description}
                  </p>

                  {/* Service Features */}
                  <div
                    className={`grid gap-3 ${
                      index === 0 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2"
                    }`}
                  >
                    {service.cards
                      ?.slice(0, index === 0 ? 2 : 2)
                      .map((card, cardIndex) => (
                        <motion.div
                          key={cardIndex}
                          whileHover={{ scale: 1.02, x: 5 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-primary/20 transition-all duration-300"
                        >
                          <Image
                            src={card.icon}
                            alt={card.title}
                            width={20}
                            height={20}
                            className="object-contain mt-1"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {card.title}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {card.description.length > 50
                                ? card.description.substring(0, 50) + "..."
                                : card.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex gap-3"
                  >
                    <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex items-center gap-2"
                      >
                        Learn More
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Image - Only for first card (side by side layout) */}
                {index === 0 && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={service.image}
                        alt={service.headline}
                        width={500}
                        height={350}
                        className="w-full object-cover"
                        priority={index === 0}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Floating Stats */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100"
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          100%
                        </div>
                        <div className="text-xs text-gray-600">
                          Success Rate
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesList;
