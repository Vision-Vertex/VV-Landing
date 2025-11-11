"use client";
import React, { useState } from "react";
import Image from "next/image";
import V from "../../../public/icons/vision-logo/v.svg";
import I from "../../../public/icons/vision-logo/I2.svg";
import S from "../../../public/icons/vision-logo/S.svg";
import I2 from "../../../public/icons/vision-logo/i.svg";
import O from "../../../public/icons/vision-logo/O.svg";
import N from "../../../public/icons/vision-logo/N.svg";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, CheckCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems } from "@/constants/data";
import Logo from "../../../public/logos/VisionVertexLogo1white.svg";
import VisionLogo from "../../../public/logos/vision.svg";
const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80";

function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="relative min-h-screen lg:h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full">
          <Image
            src={HERO_BACKGROUND}
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/70 to-primary/85" />
        </div>
      </div>
      {/* Navbar */}
      <div className="flex justify-between items-center w-full p-4 md:px-14 md:py-7 relative z-50">
        <Link href={"/"}>
          <Image className="" src={Logo} width={110} height={110} alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-10">
          <nav className="flex items-center gap-6">
            {navItems.map((navitem) =>
              navitem.link ? (
                <Link
                  key={navitem.title}
                  href={navitem.href}
                  className="text-white hover:text-primary transition-all duration-200 text-sm font-medium"
                >
                  {navitem.title}
                </Link>
              ) : (
                <div key={navitem.title} className="relative group">
                  <button className="text-white hover:text-primary transition-all duration-200 text-sm font-medium flex items-center gap-1">
                    {navitem.title}
                    <svg
                      className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180 mt-[2px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-3 w-64 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                    <ul className="py-2 space-y-2 w-full">
                      {navitem.components?.map(
                        (component: any, index: number) => (
                          <li
                            key={`${navitem.title}-${component.service_name}-${index}`}
                          >
                            <Link
                              href={component.href}
                              className="block p-3 rounded-lg hover:bg-primary text-white hover:text-white transition-colors duration-200"
                            >
                              <p className="text-xs mt-1">
                                {component.service_name}
                              </p>
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )
            )}
          </nav>
          <Button
            variant={"outline"}
            className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-primary backdrop-blur-sm"
          >
            <Link href={"/contact-us"}>Contact Us</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-white hover:text-primary transition-colors duration-200 p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Dropdown */}
        <div
          className={cn(
            "absolute top-full left-4 right-4 mt-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl sm:hidden overflow-hidden z-[100]",
            isMenuOpen ? "block" : "hidden"
          )}
        >
          {/* Decorative Elements */}
          {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div> */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary/30 rounded-full"></div>

          <div className="p-6 space-y-6">
            {navItems.map((navitem) => (
              <div key={navitem.title} className="group">
                {navitem.link ? (
                  <Link
                    href={navitem.href}
                    className="flex items-center gap-3 text-white hover:text-primary transition-colors duration-200 text-base font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-2 h-2 bg-primary/30 rounded-full group-hover:bg-primary transition-colors duration-200"></div>
                    {navitem.title}
                  </Link>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 text-white font-semibold text-base mb-3 group-hover:text-secondary/90 transition-colors duration-200">
                      <div className="w-2 h-2 bg-secondary/40 rounded-full group-hover:bg-secondary transition-colors duration-200"></div>
                      {navitem.title}
                    </div>
                    <div className="pl-5 space-y-3">
                      {navitem.components?.map(
                        (component: any, index: number) => (
                          <div
                            key={`${navitem.title}-${component.service_name}-${index}`}
                          >
                            <Link
                              href={component.href}
                              className="block text-gray-200 hover:text-primary transition-colors duration-200 text-sm"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {component.service_name}
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200/30">
              <Button
                variant={"outline"}
                className="w-full border-primary text-primary bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary hover:to-secondary hover:text-white backdrop-blur-sm transition-colors duration-200 shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href={"/contact-us"} className="flex items-center gap-2">
                  Contact Us
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <motion.div
          className="absolute top-20 left-20 w-2 h-2 bg-secondary-400 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-1 h-1 bg-secondary-300 rounded-full opacity-40"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-primary-300 rounded-full opacity-50"
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Subtle Grid Lines */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform rotate-12 scale-150"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent transform -rotate-12 scale-150"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full h-full">
          {/* Left Column - Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6 h-full lg:pt-16 order-2 lg:order-1 "
          >
            {/* Status Badge */}

            {/* Main Headline */}
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              Transform your ideas into{" "}
              <span className="text-gradient-to-r from-primary to-secondary bg-clip-text ">
                digital success
              </span>{" "}
              with us!
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-gray-200 leading-relaxed max-w-lg"
            >
              We're your partner in software engineering, cloud & DevOps, AI &
              data science, and training & R&D. From full-stack development to
              cutting-edge AI solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button className="bg-primary text-white hover:bg-gray-100 px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <Link href="/services" className="flex items-center gap-2">
                  Our Services
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-semibold backdrop-blur-sm transition-all duration-300"
              >
                <Link href="/about-us" className="flex items-center gap-2">
                  View Our Work
                  <Sparkles size={16} />
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 pt-1"
            >
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={14} className="text-secondary-400" />
                <span className="text-xs">100% Success Rate</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={14} className="text-secondary-400" />
                <span className="text-xs">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - VISION Animation */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex items-center justify-center h-full order-1 lg:order-2 pt-10 lg:pt-0"
          >
            {/* Glowing Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 rounded-full blur-3xl scale-150"></div>

            {/* VISION Logo Animation */}
            <div className="relative z-10 flex items-center justify-center">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative"
              >
                <Image
                  src={V}
                  alt="V"
                  width={120}
                  height={120}
                  className="drop-shadow-2xl"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary-400/30 to-primary-400/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="relative"
              >
                <Image
                  src={I2}
                  alt="I"
                  width={25}
                  height={25}
                  className="drop-shadow-lg"
                />
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="relative"
              >
                <Image
                  src={S}
                  alt="S"
                  width={180}
                  height={180}
                  className="drop-shadow-2xl"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary-400/30 to-primary-400/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="relative"
              >
                <Image
                  src={I}
                  alt="I"
                  width={25}
                  height={25}
                  className="drop-shadow-lg"
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="relative"
              >
                <Image
                  src={O}
                  alt="O"
                  width={150}
                  height={150}
                  className="drop-shadow-2xl"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary-400/30 to-primary-400/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="relative"
              >
                <Image
                  src={N}
                  alt="N"
                  width={105}
                  height={105}
                  className="drop-shadow-2xl"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary-400/30 to-primary-400/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 1.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.7,
                  }}
                />
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 right-10 w-10 h-10 border border-secondary-400/30 rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-8 h-8 border border-primary-400/30 rounded-full"
              animate={{
                rotate: -360,
                scale: [1, 0.9, 1],
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
