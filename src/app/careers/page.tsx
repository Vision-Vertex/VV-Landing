'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { usePublicJobs } from '@/hooks/usePublicJobs';
import { JobResponse } from '@/types/jobs';
import { toast } from 'sonner';

function CareersPage() {
  const { data, isLoading, error } = usePublicJobs();

  React.useEffect(() => {
    if (error) {
      toast.error('Failed to load jobs', {
        description: (error as any)?.message || 'Please try again later.',
      });
    }
  }, [error]);

  const formatExperienceLevel = (level: string) => {
    const levels: Record<string, string> = {
      junior: 'Entry Level',
      mid: 'Mid Level',
      senior: 'Senior',
    };
    return levels[level] || level;
  };

  const parseRequirements = (requirements: string | string[] | undefined): string[] => {
    if (!requirements) return [];
    if (Array.isArray(requirements)) return requirements;
    // If it's a string, try to split by newlines or commas
    if (typeof requirements === 'string') {
      return requirements.split('\n').filter(r => r.trim());
    }
    return [];
  };

  const jobs = data?.jobs || [];
  // Filter only active jobs for public view (both status and is_active must be true)
  const activeJobs = jobs.filter((job: JobResponse) => 
    job.status === 'active' && job.is_active === true
  );

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-10 space-y-20">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Briefcase size={16} />
            Open Positions
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Build Your Career at{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Vision Vertex
            </span>
          </motion.h1>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our current job openings and find the perfect role for you.
            </p>
          </motion.div>
        </motion.div>

        {/* Open Positions Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : activeJobs.length > 0 ? (
            <div className="space-y-6">
              {activeJobs.map((job: JobResponse, index: number) => {
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01, y: -4 }}
                    className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                              {job.title}
                            </h3>
                            {job.framework && (
                              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                {job.framework}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            {job.location && (
                              <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-primary" />
                                <span>{job.location}{job.remote ? ' • Remote' : ''}</span>
                              </div>
                            )}
                            {job.employment_type && (
                              <div className="flex items-center gap-2">
                                <Clock size={16} className="text-secondary" />
                                <span>{job.employment_type}</span>
                              </div>
                            )}
                            {job.experience_level && (
                              <div className="flex items-center gap-2">
                                <Briefcase size={16} className="text-primary" />
                                <span>{formatExperienceLevel(job.experience_level)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {job.description && (
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {job.description}
                        </p>
                      )}

                      
                      <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                        <Link href={`/careers/${job.id}`} className="flex items-center gap-2">
                          View Details
                          <ArrowRight size={18} />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Briefcase className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No open positions at the moment</h3>
              <p className="text-gray-600">
                Check back soon for new opportunities, or send us your resume for future consideration.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default CareersPage;
