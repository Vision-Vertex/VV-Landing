'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Briefcase, MapPin, Clock, ArrowLeft, Users, DollarSign, 
  Calendar, FileText, Loader2, AlertCircle, Edit, Trash2
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useJob } from '@/hooks/useJobs';
import { useUpdateJob } from '@/hooks/useUpdateJob';
import { useDeleteJob } from '@/hooks/useDeleteJob';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { toast } from 'sonner';
import { parseRequirements, formatExperienceLevel, formatSalary } from '@/lib/utils';

function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const jobId = params.id as string;
  const [isDeletingJob, setIsDeletingJob] = React.useState(false);
  const { data: job, isLoading, error } = useJob(jobId, { enabled: !isDeletingJob });
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  React.useEffect(() => {
    // Don't show error toast if we're deleting the job (404 is expected)
    if (error && !isDeletingJob) {
      toast.error('Failed to load job details', {
        description: (error as any)?.message || 'Please try again later.',
      });
    }
  }, [error, isDeletingJob]);

  const handleEdit = () => {
    router.push(`/admin/jobs/${jobId}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setIsDeletingJob(true);
    
    // Cancel any ongoing queries and remove the query cache immediately to prevent refetching
    queryClient.cancelQueries({ queryKey: ['admin', 'jobs', jobId] });
    queryClient.removeQueries({ queryKey: ['admin', 'jobs', jobId] });
    
    deleteJob(jobId, {
      onSuccess: () => {
        // Redirect immediately
        router.push('/admin/jobs');
      },
      onError: () => {
        // Re-enable query if deletion fails
        setIsDeletingJob(false);
      },
    });
  };


  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </ProtectedRoute>
    );
  }

  if (!job) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
          <div className="text-center">
            <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push('/admin/jobs')}>
              <ArrowLeft size={18} className="mr-2" />
              Back to Jobs
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 px-6 md:px-16 py-10 space-y-8">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <Link href="/admin/jobs">
              <Button variant="outline" className="gap-2">
                <ArrowLeft size={18} />
                Back to Jobs
              </Button>
            </Link>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={handleEdit}
                variant="outline"
                className="gap-2 border-primary text-primary hover:bg-primary hover:text-white"
                disabled={isUpdating || isDeleting}
              >
                <Edit size={18} />
                Edit Job
              </Button>
              
              <Button
                onClick={handleDelete}
                variant="outline"
                className="gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                disabled={isUpdating || isDeleting}
              >
                <Trash2 size={18} />
                Delete Job
              </Button>
              
              <Link href={`/admin/jobs/${jobId}/applications`}>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white gap-2">
                  <Users size={18} />
                  View Applications
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Delete Confirmation Modal */}
          <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="text-red-600" size={24} />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    Delete Job Posting
                  </DialogTitle>
                </div>
                <DialogDescription className="text-gray-600 pt-2">
                  Are you sure you want to delete <strong>"{job.title}"</strong>? This action cannot be undone and will permanently remove the job posting and all associated data.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-3 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="w-full sm:w-auto gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Delete Job
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Job Details Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
          >
            <div className="space-y-6">
              {/* Title and Status */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {job.title}
                    </h1>
                    {job.status && (
                      <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium ${
                        job.status === 'active' 
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : job.status === 'draft'
                          ? 'bg-gray-100 text-gray-700 border border-gray-200'
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    {job.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-primary" />
                        <span>{job.location}</span>
                        {job.remote && <span className="text-primary">• Remote</span>}
                      </div>
                    )}
                    {job.employment_type && (
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-secondary" />
                        <span>{job.employment_type}</span>
                      </div>
                    )}
                    {job.experience_level && (
                      <div className="flex items-center gap-2">
                        <Briefcase size={18} className="text-primary" />
                        <span>{formatExperienceLevel(job.experience_level)}</span>
                      </div>
                    )}
                    {job.framework && (
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-secondary" />
                        <span>{job.framework}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Salary */}
              {(job.salary_min || job.salary_max) && (
                <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                  <DollarSign size={20} className="text-primary" />
                  <span className="font-semibold text-gray-900">
                    {formatSalary(job.salary_min || 0, job.salary_max || 0, job.salary_currency || 'ETB')}
                  </span>
                </div>
              )}

              {/* Description */}
              {job.description && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Job Description</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>
              )}

              

              {/* Required Skills */}
              {job.requirements && (() => {
                const requirementsList = parseRequirements(job.requirements);
                return requirementsList.length > 0 ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Requirements</h2>
                    <ul className="space-y-3">
                      {requirementsList.map((requirement, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                          </div>
                          <span className="text-gray-600 leading-relaxed flex-1">
                            {requirement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Requirements</h2>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {typeof job.requirements === 'string' ? job.requirements : JSON.stringify(job.requirements)}
                    </div>
                  </div>
                );
              })()}
 {
                job.required_skills && (() => {
                  // Parse required_skills - handle both string and array
                  const skillsList = typeof job.required_skills === 'string' 
                    ? (job.required_skills as string).split(',').map((skill: string) => skill.trim()).filter(Boolean)
                    : Array.isArray(job.required_skills)
                    ? (job.required_skills as string[]).map(skill => String(skill).trim()).filter(Boolean)
                    : [];

                  return skillsList.length > 0 ? (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">Required Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {skillsList.map((skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()
              }
              {/* Metadata */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  {job.created_at && (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Created: {new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                  )}
                  {job.updated_at && (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Updated: {new Date(job.updated_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default JobDetailPage;

