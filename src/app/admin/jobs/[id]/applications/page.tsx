'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Users, Mail, Phone, Calendar, FileText, 
  Loader2, CheckCircle2, XCircle, Clock, Eye, MoreVertical,
  Eye as ViewIcon
} from 'lucide-react';
import { useApplications, Application } from '@/hooks/useApplications';
import { useJob } from '@/hooks/useJobs';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { toast } from 'sonner';
import { getStatusBadgeConfig } from '@/lib/utils';
import { apiClient } from '@/lib/api';

function ApplicationsPage() {
  const params = useParams(); 
  const jobId = params.id as string;
  const { data: applicationsData, isLoading, error } = useApplications(jobId);
  const { data: job } = useJob(jobId);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [loadingResume, setLoadingResume] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  React.useEffect(() => {
    if (error) {
      toast.error('Failed to load applications', {
        description: (error as any)?.message || 'Please try again later.',
      });
    }
  }, [error]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([id, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      });
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const toggleDropdown = (applicationId: string) => {
    setOpenDropdown(openDropdown === applicationId ? null : applicationId);
  };

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setOpenDropdown(null);
  };

  const handleViewResume = async (applicationId: string) => {
    setOpenDropdown(null);
    setLoadingResume(applicationId);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const token = localStorage.getItem('access_token');
      
      // Fetch resume from the endpoint
      const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/resume`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.detail || `Failed to fetch resume: ${response.statusText}`);
      }

      // Get the blob from response
      const blob = await response.blob();
      
      // Determine content type
      const contentType = response.headers.get('content-type') || blob.type;
      const isPDF = contentType.includes('pdf') || contentType === 'application/pdf';
      
      // Create a blob URL for viewing
      const blobUrl = window.URL.createObjectURL(blob);
      
      // For PDFs, open directly in new tab (browser will use native PDF viewer)
      // For other formats (DOC/DOCX), the browser may download, but we still open in new tab
      const newWindow = window.open(blobUrl, '_blank', 'noopener,noreferrer');
      
      if (!newWindow) {
        // If popup was blocked, fall back to creating a link
        const link = document.createElement('a');
        link.href = blobUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        // Don't set download attribute - this allows viewing instead of downloading
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      // Note: We don't revoke the blob URL immediately to allow viewing
      // The browser will handle cleanup when the tab is closed
      // For long-term cleanup, we could track blob URLs and revoke them on page unload

      toast.success('Resume opened in new tab', {
        description: isPDF ? 'The PDF should open in your browser\'s viewer.' : 'The file is opening in a new tab.',
      });
    } catch (error: any) {
      toast.error('Failed to load resume', {
        description: error?.message || 'Unable to fetch the resume. Please try again.',
      });
    } finally {
      setLoadingResume(null);
    }
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

  const applications = applicationsData?.applications || [];

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
            className="space-y-4"
          >
            <Link href={`/admin/jobs/${jobId}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft size={18} />
                Back to Job Details
              </Button>
            </Link>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Applications for{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {job?.title || 'Job'}
                </span>
              </h1>
              <p className="text-gray-600">
                {applications.length} {applications.length === 1 ? 'application' : 'applications'} received
              </p>
            </div>
          </motion.div>

          {/* Applications Table */}
          {applications.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Applied Date
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((application: Application, index: number) => {
                      const config = getStatusBadgeConfig(application.status);
                      const Icon = config.icon;
                      
                      return (
                        <motion.tr
                          key={application.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                                <span className="text-primary font-semibold text-sm">
                                  {application?.candidate_name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {application?.candidate_name}
                                </div>
                                {application.candidate_email && (
                                  <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                                    {application.candidate_email}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 space-y-1">
                              {application.candidate_phone && (
                                <div className="flex items-center gap-2">
                                  <Mail size={14} className="text-primary" />
                                  <a 
                                    href={`tel:${application.candidate_phone}`}
                                    className="hover:text-primary transition-colors"
                                  >
                                    {application.candidate_phone}
                                  </a>
                                </div>
                              )}
                              {application.applicant_phone && (
                                <div className="flex items-center gap-2">
                                  <Phone size={14} className="text-secondary" />
                                  <a 
                                    href={`tel:${application.applicant_phone}`}
                                    className="hover:text-secondary transition-colors"
                                  >
                                    {application.applicant_phone}
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} border ${config.border} capitalize`}>
                              <Icon size={12} />
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar size={14} className="text-primary" />
                              <span>{new Date(application.created_at).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="relative inline-block" ref={(el) => { dropdownRefs.current[application.id] = el; }}>
                              <button
                                onClick={() => toggleDropdown(application.id)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <MoreVertical size={18} className="text-gray-600" />
                              </button>
                              
                              {openDropdown === application.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden"
                                >
                                  <div className="py-1">
                                    <button
                                      onClick={() => handleViewDetails(application)}
                                      className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    >
                                      <ViewIcon size={16} className="text-primary" />
                                      View Details
                                    </button>
                                    <button
                                      onClick={() => handleViewResume(application.id)}
                                      disabled={loadingResume === application.id}
                                      className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {loadingResume === application.id ? (
                                        <>
                                          <Loader2 size={16} className="text-secondary animate-spin" />
                                          Loading...
                                        </>
                                      ) : (
                                        <>
                                          <FileText size={16} className="text-secondary" />
                                          View Resume
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Users className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600">
                Applications for this job will appear here once candidates start applying.
              </p>
            </motion.div>
          )}

          {/* Application Detail Modal */}
          {selectedApplication && (
            <div 
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]"
              onClick={() => setSelectedApplication(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Applicant Information</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600"><strong>Name:</strong> {selectedApplication.candidate_name}</p>
                      <p className="text-gray-600"><strong>Email:</strong> {selectedApplication.candidate_email}</p>
                      {selectedApplication.candidate_phone && (
                        <p className="text-gray-600"><strong>Phone:</strong> {selectedApplication.candidate_phone}</p>
                      )}
                      <div className="mt-2">
                        {(() => {
                          const config = getStatusBadgeConfig(selectedApplication.status);
                          const Icon = config.icon;
                          return (
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} border ${config.border} capitalize`}>
                              <Icon size={12} />
                              {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {selectedApplication.cover_letter && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Cover Letter</h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {selectedApplication.cover_letter}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume</h3>
                    <button
                      onClick={() => handleViewResume(selectedApplication.id)}
                      disabled={loadingResume === selectedApplication.id}
                      className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingResume === selectedApplication.id ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Loading Resume...
                        </>
                      ) : (
                        <>
                          <FileText size={18} />
                          View Resume
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Applied on {new Date(selectedApplication.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default ApplicationsPage;

