'use client';

import { useQuery } from '@tanstack/react-query';
import { JobResponse } from '@/types/jobs';
import { getApiBaseUrl } from '@/lib/api-config';

export interface PublicJobsResponse {
  jobs: JobResponse[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

// Public endpoint - no authentication required
async function fetchPublicJobs(): Promise<PublicJobsResponse> {
  const response = await fetch(`${getApiBaseUrl()}/jobs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || error.detail || 'Failed to fetch jobs');
  }

  return response.json();
}

// Public endpoint - no authentication required
async function fetchPublicJobById(id: string): Promise<JobResponse> {
  const response = await fetch(`${getApiBaseUrl()}/jobs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || error.detail || 'Failed to fetch job details');
  }

  return response.json();
}

export function usePublicJobs() {
  return useQuery({
    queryKey: ['public', 'jobs'],
    queryFn: fetchPublicJobs,
  });
}

export function usePublicJob(id: string) {
  return useQuery({
    queryKey: ['public', 'jobs', id],
    queryFn: () => fetchPublicJobById(id),
    enabled: !!id,
  });
}
