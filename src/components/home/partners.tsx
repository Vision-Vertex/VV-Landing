"use client";
import React from "react";
import { partners as partneritems } from "@/constants/data";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Handshake, Star } from "lucide-react";
//const marqueePartners = [...partneritems, ...partneritems];
const items = partneritems;


function Partners() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-primary/5 py-24">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-secondary/10 blur-[140px]" />
        <div className="absolute top-6 right-6 h-56 w-56 rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-44 w-44 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.06),transparent_58%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-14">
        {/* Header Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-4xl text-center"
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
            className="mx-auto text-lg leading-relaxed text-gray-600 md:max-w-3xl"
          >
            At the core of our success is a network of trusted partners who
            share our commitment to innovation and excellence. These strategic
            alliances enhance our ability to deliver exceptional IT solutions.
          </motion.p>
        </motion.div>

        {/* Animated marquee */}
        {/* <div className="relative mx-auto mb-16 overflow-hidden rounded-3xl border border-primary/10 bg-white/90 py-6 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.2)] backdrop-blur">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent" />
          <motion.div
            className="flex min-w-full items-center gap-12"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {marqueePartners.map((partner, index) => (
              <div
                key={`marquee-${index}`}
                className="flex items-center justify-center rounded-full border border-primary/10 bg-white px-7 py-3 shadow-sm"
              >
                <Image
                  src={partner.path}
                  alt={partner.alt}
                  width={90}
                  height={36}
                  className="h-9 w-auto object-contain"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            ))}
          </motion.div>
        </div> */}

        {/* Partners Grid */}
        {/* <motion.div
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
              <div className="relative overflow-hidden rounded-3xl border border-secondary/15 bg-white p-7 shadow-[0_30px_70px_-30px_rgba(79,70,229,0.4)] transition-all duration-300 hover:-translate-y-2 hover:border-secondary/40 hover:shadow-[0_36px_80px_-24px_rgba(79,70,229,0.45)]">
                <div className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br from-secondary/25 via-primary/10 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-24 items-center justify-center">
                  <Image
                    src={partner.path}
                    alt={partner.alt}
                    width={90}
                    height={90}
                    className={`w-auto object-contain grayscale transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0 ${
                      index === 2 ? "h-12" : "h-18"
                    }`}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
                <div className="relative mt-6 text-center">
                  <div className="absolute inset-x-10 -top-3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <h3 className="text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-primary">
                    {/* {partner.alt} */}
                  {/* </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.35em] text-gray-400">
                    Partner
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>  */}
        <motion.div
        className="flex space-x-8  mb-20 "
        animate={{ x: ["-100%", "0%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, 
          ease: "linear",
        }}
      >
        {items.map((partner, index) => (
          <div key={index} className="group relative m-4 ">
            <div className="relative overflow-hidden w-64 min-h-[60px] rounded-2xl border border-secondary/10 bg-white p-8 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 w-40 mx-auto justify-between hover:shadow-[0_36px_80px_-24px_rgba(79,70,229,0.45)]">
              <div className="relative flex h-40 items-center justify-center  bg-transparent leading-3.2">
                
                <Image
                  src={partner.path}
                  alt={partner.alt}
                  width={160}
                  height={160}
                  className="w-auto h-32 object-contain transition-transform duration-300 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
                />
                
              </div>
              <div className="relative mt-6 text-center">
                <h3 className="text-base font-semibold text-gray-700 transition-colors duration-300 group-hover:text-primary">
                  {/* {partner.alt} */}
                </h3>
                <p className="-mt-2 text-xs uppercase tracking-[0.25em] text-gray-400 items-center justify-center flex gap-1">
                  {partner.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    
        {/* CTA Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-primary/10 bg-white p-8 shadow-[0_25px_65px_-28px_rgba(79,70,229,0.55)] md:p-12">
            <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.18),transparent_65%)] opacity-60" />
            <div className="relative flex flex-col items-center gap-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Ready to Partner with Us?
              </h3>
              <div className="flex items-center justify-center gap-6 text-xs font-semibold uppercase tracking-[0.5em] text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="h-1 w-8 rounded-full bg-primary" />
                  Partnership Network
                </span>
                <span className="hidden items-center gap-2 sm:flex">
                  Global Reach
                  <span className="h-1 w-8 rounded-full bg-secondary" />
                </span>
              </div>
              <p className="max-w-2xl text-base text-gray-600">
                Join our network of trusted partners and together we can create
                innovative solutions that drive business growth and
                technological advancement.
              </p>
              <Button className="group inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_48px_-22px_rgba(99,102,241,0.75)] transition-transform duration-300 hover:-translate-y-1 hover:bg-secondary/90 hover:shadow-[0_26px_58px_-18px_rgba(99,102,241,0.8)]">
                <Link href="/contact-us" className="flex items-center gap-2">
                  Become Our Partner
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Partners;
