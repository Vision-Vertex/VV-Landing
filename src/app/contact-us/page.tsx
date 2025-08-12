"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";
import PhoneInput, {
  getCountryCallingCode,
  Country,
} from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, Users, MessageSquare } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phone: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<Country>("ET");
  const [message, setMessage] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value: E164Number | undefined) => {
    const phone = value || "";
    setFormData({ ...formData, phone });
  };

  type ExtendedCountry = Country | "ZZ";

  const handleCountryChange = (country: ExtendedCountry | undefined) => {
    if (!country || country == "ZZ") {
      setSelectedCountry("ET");
      return;
    }
    setSelectedCountry(country);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    const templateParams = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setMessage({
        message: "Your message has been sent successfully!",
        type: "success",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        phone: "",
      });
      setSelectedCountry("ET");
    } catch (error) {
      console.error("EmailJS failed to send email:", error);
      setMessage({
        message: "There was an error sending your message. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

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
                <MessageSquare size={16} />
                Get In Touch
              </motion.div>

              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                Let's Start a{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Conversation
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                At Vision Vertex Solutions, we help businesses cut costs and scale faster with expert offshore development teams and tailored technology solutions.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Jane"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              />
            </div>
            <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              />
            </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jane@gmail.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              />
            </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
                    <div className="flex items-stretch rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
                      <div className="bg-gray-100 px-4 py-3 flex items-center border-r border-gray-200">
                  <PhoneInput
                    international
                    country={selectedCountry}
                    onCountryChange={handleCountryChange}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="react-phone-input-custom"
                    inputComponent={({ inputRef, ...rest }) => (
                      <input
                        ref={inputRef}
                        {...rest}
                        style={{
                          position: "absolute",
                          left: "-9999px",
                          height: 1,
                          width: 1,
                          opacity: 0,
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  />
                  <style jsx global>
                    {`
                      .react-phone-input-custom .PhoneInputCountryIcon {
                        display: none !important; 
                      }
                    `}
                  </style>
                        <span className="ml-2 text-gray-600 font-medium">
                    +{getCountryCallingCode(selectedCountry)}
                  </span>
                </div>
                <input
                  type="tel"
                  placeholder="913884176"
                        className="flex-1 px-4 py-3 bg-gray-50 outline-none"
                  value={formData.phone.replace(
                    `+${getCountryCallingCode(selectedCountry)}`,
                    ""
                  )}
                  onChange={(e) =>
                    handlePhoneChange(
                      `+${getCountryCallingCode(selectedCountry)}${
                        e.target.value
                      }` as E164Number
                    )
                  }
                />
              </div>
            </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                      placeholder="Tell us about your project..."
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
              />
            </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
              <Button
                type="submit"
                disabled={loading}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send size={18} />
                          Send Message
                        </div>
                      )}
              </Button>
                  </motion.div>

                  {message.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-2 p-4 rounded-xl ${
                        message.type === "error" 
                          ? "bg-red-50 border border-red-200 text-red-700" 
                          : "bg-green-50 border border-green-200 text-green-700"
                      }`}
                    >
                      {message.type === "error" ? (
                        <AlertCircle size={20} />
                      ) : (
                        <CheckCircle size={20} />
                      )}
                {message.message}
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Contact Info & Map */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-8"
              >
                {/* Contact Info Cards */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="bg-gradient-to-br from-primary to-primary/90 text-white p-6 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                        <p className="text-white/90">info@visionvertex.tech</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-gradient-to-br from-secondary to-secondary/90 text-white p-6 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                        <p className="text-white/90">+251-923623256</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                        <p className="text-white/90">4 kilo Behind Ambassador mall in front of 4 kilo police station, Addis Ababa</p>
                      </div>
            </div>
                  </motion.div>
        </div>

                {/* Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200"
                >
          <iframe
                    src="https://www.google.com/maps?q=4+kilo+Behind+Ambassador+mall+in+front+of+4+kilo+police+station,+Addis+Ababa&output=embed"
                    className="w-full h-64"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
                </motion.div>

                {/* Response Time Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                      <Clock size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">Response Time</h3>
                      <p className="text-gray-600">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
        </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
