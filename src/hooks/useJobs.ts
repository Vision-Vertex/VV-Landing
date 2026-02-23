'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { JobResponse } from '@/types/jobs';

export interface JobsResponse {
  jobs: JobResponse[];
  total?: number;
  page?: number;
  limit?: number;
  total_Pages?: number;
}
async function fetchJobs(): Promise<JobsResponse> {
  try {
    const response = await apiClient.get<JobsResponse>('/jobs');
    return response;
  } catch (error: any) {
    throw error;
  }
}

export function useJobs() {
  return useQuery({
    queryKey: ['admin', 'jobs'],
    queryFn: fetchJobs,
    refetchOnMount: true,  
    refetchOnWindowFocus: true,
  });
}

async function fetchJobById(id: string): Promise<JobResponse> {
  try {
    const response = await apiClient.get<JobResponse>(`/jobs/${id}`);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export function useJob(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['admin', 'jobs', id],
    queryFn: () => fetchJobById(id),
    enabled: options?.enabled !== false && !!id,
  });
}