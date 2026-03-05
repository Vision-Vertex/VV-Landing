'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock, ArrowRight, Search, X, Plus, Loader2 } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { JobResponse } from '@/types/jobs';
import { toast } from 'sonner';
import { formatExperienceLevel } from '@/lib/utils';

function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useJobs();

  // Handle errors
  React.useEffect(() => {
    if (error) {
      toast.error('Failed to load jobs', {
        description: (error as any)?.message || 'Please try again later.',
      });
    }
  }, [error]);

  // Filter jobs based on search term
  const filteredJobs = React.useMemo(() => {
    if (!data?.jobs) return [];
    return data.jobs.filter(
      (job: JobResponse) =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.framework?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);



  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-4"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center pt-10"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Briefcase size={16} />
              Job Management
            </motion.div>
            
            <div className="flex items-center justify-between mb-6">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-gray-900"
              >
                Manage{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Job Openings
                </span>
              </motion.h1>
              
              
            </div>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 max-w-2xl mx-auto mb-10"
            >
              View, edit, or deactivate active job postings. Track applications and manage recruitment workflows from one place.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-xl mx-auto relative"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <Search className="ml-4 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search jobs by title, location, or framework..."
                    className="w-full px-4 py-4 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mr-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Jobs Grid Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8 pb-20"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {filteredJobs.map((job: JobResponse, index: number) => (
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
                    <Link href={`/admin/jobs/${job.id}`} className="flex items-center gap-2">
                      View Details
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>
              </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No jobs found' : 'No jobs available'}
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? `We couldn't find any positions matching "${searchTerm}".`
                  : 'Get started by creating your first job posting.'}
              </p>
              {!searchTerm && (
                <Link href="/admin/jobs/create" className="mt-6 inline-block">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
                    <Plus size={18} className="mr-2" />
                    Create Your First Job
                  </Button>
                </Link>
              )}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-6 text-primary font-medium hover:underline"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default JobsPage;
