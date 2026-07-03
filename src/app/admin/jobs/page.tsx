'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock, ArrowRight, Search, X, Plus, Loader2 } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { JobResponse } from '@/types/jobs';
import { toast } from 'sonner';
import { formatExperienceLevel } from '@/lib/utils';
import { AdminPageHeader } from '@/components/layout/admin-page-header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useJobs();

  React.useEffect(() => {
    if (error) {
      toast.error('Failed to load jobs', {
        description: (error as Error)?.message || 'Please try again later.',
      });
    }
  }, [error]);

  const filteredJobs = React.useMemo(() => {
    if (!data?.jobs) return [];
    return data.jobs.filter(
      (job: JobResponse) =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.framework?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const activeCount = filteredJobs.filter((j) => j.status === 'active').length;
  const draftCount = filteredJobs.filter((j) => j.status === 'draft').length;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-6">
          <AdminPageHeader
            tag="Jobs Management"
            title="Job Openings"
            description="View, edit, and manage active job postings and track applications."
          />

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{filteredJobs.length}</p>
            </div>
            <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{activeCount}</p>
            </div>
            <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Draft</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{draftCount}</p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search jobs by title, location, or framework..."
                className="w-full h-10 pl-10 pr-10 text-sm rounded-md border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Jobs list */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20 bg-white rounded-md border border-gray-100">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {filteredJobs.map((job: JobResponse) => (
                  <div
                    key={job.id}
                    className="p-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {job.title}
                          </h3>
                          {job.framework && (
                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                              {job.framework}
                            </span>
                          )}
                          <span
                            className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full capitalize ${
                              job.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : job.status === 'draft'
                                  ? 'bg-gray-100 text-gray-600'
                                  : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {job.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          {job.location && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin size={14} className="text-primary" />
                              {job.location}{job.remote ? ' • Remote' : ''}
                            </span>
                          )}
                          {job.employment_type && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock size={14} className="text-secondary" />
                              {job.employment_type}
                            </span>
                          )}
                          {job.experience_level && (
                            <span className="inline-flex items-center gap-1.5">
                              <Briefcase size={14} className="text-primary" />
                              {formatExperienceLevel(job.experience_level)}
                            </span>
                          )}
                        </div>

                        {job.description && (
                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {job.description}
                          </p>
                        )}
                      </div>

                      <Button variant="outline" size="sm" asChild className="shrink-0">
                        <Link href={`/admin/jobs/${job.id}`} className="flex items-center gap-1.5">
                          View Details
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-md border border-gray-100">
              <Briefcase className="mx-auto text-gray-300 mb-3" size={40} />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {searchTerm ? 'No jobs found' : 'No jobs available'}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {searchTerm
                  ? `No positions match "${searchTerm}".`
                  : 'Get started by creating your first job posting.'}
              </p>
              {searchTerm ? (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Clear search
                </button>
              ) : (
                <Button asChild>
                  <Link href="/admin/jobs/create" className="flex items-center gap-2">
                    <Plus size={16} />
                    Create Your First Job
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default JobsPage;
