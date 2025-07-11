"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";
import PhoneInput, {
  getCountryCallingCode,
  Country,
} from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import "react-phone-number-input/style.css";

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
    <div className="flex flex-col min-h-screen bg-white gap-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-16 lg:px-40 py-10 md:py-20">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-primary mb-2">Get In Touch</h1>
          <p className="text-sm text-gray-600 mb-6">
            At Vision5 Tech, we help businesses cut costs and scale faster with
            expert offshore development teams and tailored technology solutions.
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 flex-1"
          >
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
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
                className="mt-1 w-full px-3 py-2 bg-gray-100 placeholder-gray-400 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
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
                className="mt-1 w-full px-3 py-2 bg-gray-100 placeholder-gray-400 rounded-lg focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
                className="mt-1 w-full px-3 py-2 bg-gray-100 placeholder-gray-400 rounded-lg focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="flex items-stretch mt-1 rounded-lg overflow-hidden border-none">
                <div className="bg-accent px-3 py-2 flex items-center">
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

                  <span className="ml-1">
                    +{getCountryCallingCode(selectedCountry)}
                  </span>
                </div>
                <input
                  type="tel"
                  placeholder="913884176"
                  className="flex-1 px-3 py-2 bg-gray-100 outline-none"
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
            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type here…"
                className="mt-1 w-full h-32 px-3 py-2 bg-gray-100 placeholder-gray-400 rounded-lg focus:outline-none resize-none"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center md:col-span-2 gap-2">
              <Button
                type="submit"
                className="py-5 rounded-xl min-w-[180px]"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Us A Message"}
              </Button>
              <p
                className={`text-sm ${
                  message.type === "error" ? "text-red-600" : "text-green-600"
                } mt-2`}
              >
                {message.message}
              </p>
            </div>
          </form>
        </div>
        <div className="h-64 md:h-full rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps?q=5000+Thayer+Center+Suite+C,+Oakland,+MD&output=embed"
            className="w-full h-full min-h-[250px]"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
