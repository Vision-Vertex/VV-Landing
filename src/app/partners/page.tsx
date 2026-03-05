"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { partners as partneritems } from "@/constants/data";
import { ArrowRight, Handshake, Star } from "lucide-react";
import Link from "next/link";

function PartnersPage() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mx-auto mb-16 max-w-4xl text-center "
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-6 py-2 text-sm font-semibold text-primary shadow-sm"
      >
        <Handshake size={16} />
        Partners
      </motion.div>

      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-gray-900 md:text-5xl"
      >
        Trusted by Industry{" "}
        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Leaders
        </span>
      </motion.h2>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mx-auto text-lg leading-relaxed text-gray-600 md:max-w-3xl mb-20"
      >
        At the core of our success is a network of trusted partners who
        share our commitment to innovation and excellence. These strategic
        alliances enhance our ability to deliver exceptional IT solutions.
      </motion.p>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {partneritems.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-secondary/15 bg-white p-4 shadow-none transition-all duration-300 hover:-translate-y-2 hover:border-secondary/40 hover:shadow-[0_36px_80px_-24px_rgba(79,70,229,0.45)] lg:shadow-sm">
              <div className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br from-secondary/25 via-primary/10 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-24 items-center justify-center">
                <motion.a href={partner.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={partner.path}
                  alt={partner.alt}
                  width={100}
                  height={60}
                  className={`w-auto object-contain transition-all duration-300 group-hover:scale-110 ${
                    index === 2 ? "h-12" : "h-18"
                  }`}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
                />
                </motion.a>
              </div>
              <div className="relative mt-6 text-center">
                <div className="absolute inset-x-10 -top-3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <h3 className="text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-primary">
                  {/* {partner.alt} */}
                </h3>
                <p className="-mt-2 text-xs uppercase tracking-[0.35em] text-gray-400 leading-3.2">
                  {partner.name}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  ); 
}

export default PartnersPage;
