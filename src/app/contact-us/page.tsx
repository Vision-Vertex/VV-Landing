"use client"
import React, { useState } from 'react';
import {Button} from '@/components/ui/button';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    phone: '',
  });
 const [message, setMessage] = useState({message:'', type:''});
 const [loading, setLoading] = useState(false);
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage({message:'Your message has been sent!', type:'success'});
        setFormData({ firstName: '', lastName: '', email: '', message: '', phone: '' });
      } else {
        setMessage({message:'There was an error sending your message.', type:'error'});
      }
    } catch (error) {
      setMessage({message:'There was an error sending your message.', type:'error'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-white gap-14'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-16 lg:px-40 py-10 md:py-20">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-primary mb-2">Get In Touch</h1>
          <p className="text-sm text-gray-600 mb-6">
            At Vision5 Tech, we help businesses cut costs and scale faster with expert offshore development teams and tailored technology solutions.
          </p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 flex-1">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 flex rounded-lg overflow-hidden bg-gray-100">
                <span className="flex items-center px-3 text-gray-500 border-r border-gray-200">
                  🇪🇹 +251
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="913884176"
                  className="flex-1 px-3 py-2 bg-gray-100 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
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
                className='py-5 rounded-xl min-w-[180px]'
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Us A Message'}
              </Button>
              <p className={`text-sm ${message.type === 'error'? 'text-red-600':'text-green-600'} mt-2`}>{message.message}</p>
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