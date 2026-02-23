'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, Send, Upload, FileText, Mail, Phone, User,
  Loader2, AlertCircle, CheckCircle2
} from 'lucide-react';
import { usePublicJob } from '@/hooks/usePublicJobs';
import { useApplyJob } from '@/hooks/useApplyJob';
import { toast } from 'sonner';

function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const { data: job, isLoading: jobLoading } = usePublicJob(jobId);
  const { mutate: applyJob, isPending } = useApplyJob();

  const [formData, setFormData] = useState({
    candidate_name: '',
    candidate_email: '',
    candidate_phone: '',
    cover_letter: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large', {
          description: 'Resume must be less than 5MB.',
        });
        return;
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type', {
          description: 'Please upload a PDF or Word document.',
        });
        return;
      }
      setResume(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.candidate_name.trim()) {
      newErrors.candidate_name = 'Name is required';
    }
    
    if (!formData.candidate_email.trim()) {
      newErrors.candidate_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.candidate_email)) {
      newErrors.candidate_email = 'Please enter a valid email address';
    }
    
    if (!formData.cover_letter.trim()) {
      newErrors.cover_letter = 'Cover letter is required';
    }
    
    if (!resume) {
      newErrors.resume = 'Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields', {
        description: 'Make sure all fields are completed correctly.',
      });
      return;
    }

    if (!jobId) {
      toast.error('Invalid job ID');
      return;
    }

    applyJob(
      {
        job_id: jobId,
        candidate_name: formData.candidate_name,
        candidate_email: formData.candidate_email,
        candidate_phone: formData.candidate_phone || undefined,
        cover_letter: formData.cover_letter,
        resume: resume!,
      },
      {
        onSuccess: () => {
          // Reset form
          setFormData({
            candidate_name: '',
            candidate_email: '',
            candidate_phone: '',
            cover_letter: '',
          });
          setResume(null);
          // Redirect after a delay
          setTimeout(() => {
            router.push('/careers');
          }, 2000);
        },
      }
    );
  };

  if (jobLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
          <p className="text-gray-600 mb-6">This job posting is no longer available.</p>
          <Button onClick={() => router.push('/careers')}>
            <ArrowLeft size={18} className="mr-2" />
            Back to Careers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href={`/careers/${jobId}`}>
              <Button variant="outline" className="gap-2 mb-6">
                <ArrowLeft size={18} />
                Back to Job Details
              </Button>
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Apply for{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {job.title}
              </span>
            </h1>
            <p className="text-gray-600">
              Fill out the form below to submit your application. We'll review it and get back to you soon.
            </p>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="candidate_name" className="text-gray-800 font-semibold mb-2 block">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="candidate_name"
                    name="candidate_name"
                    type="text"
                    value={formData.candidate_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`pl-12 ${errors.candidate_name ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
                {errors.candidate_name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.candidate_name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="candidate_email" className="text-gray-800 font-semibold mb-2 block">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="candidate_email"
                    name="candidate_email"
                    type="email"
                    value={formData.candidate_email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className={`pl-12 ${errors.candidate_email ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
                {errors.candidate_email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.candidate_email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="candidate_phone" className="text-gray-800 font-semibold mb-2 block">
                  Phone Number
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <Input
                    id="candidate_phone"
                    name="candidate_phone"
                    type="tel"
                    value={formData.candidate_phone}
                    onChange={handleChange}
                    placeholder="+1234567890"
                    className="pl-12"
                  />
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <Label htmlFor="cover_letter" className="text-gray-800 font-semibold mb-2 block">
                  Cover Letter <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="cover_letter"
                  name="cover_letter"
                  value={formData.cover_letter}
                  onChange={handleChange}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  rows={6}
                  className={errors.cover_letter ? 'border-red-500' : ''}
                  required
                />
                {errors.cover_letter && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.cover_letter}
                  </p>
                )}
              </div>

              {/* Resume Upload */}
              <div>
                <Label htmlFor="resume" className="text-gray-800 font-semibold mb-2 block">
                  Resume/CV <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className={`flex items-center gap-3 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                      errors.resume 
                        ? 'border-red-500 bg-red-50' 
                        : resume 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {resume ? (
                      <>
                        <CheckCircle2 size={20} className="text-green-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{resume.name}</p>
                          <p className="text-xs text-gray-500">
                            {(resume.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            setResume(null);
                          }}
                        >
                          Change
                        </Button>
                      </>
                    ) : (
                      <>
                        <Upload size={20} className="text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF or Word document (MAX. 5MB)
                          </p>
                        </div>
                      </>
                    )}
                  </label>
                </div>
                {errors.resume && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.resume}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send size={20} />
                      Submit Application
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ApplyPage;

