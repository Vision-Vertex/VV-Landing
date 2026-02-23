'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { JobFormData, JobResponse } from '@/types/jobs';
import { apiClient } from '@/lib/api';

async function createJob(data: JobFormData): Promise<JobResponse> {
  // Prepare payload matching backend API exactly
  const payload: Record<string, any> = {
    title: data.title?.trim() || '',
    description: data.description?.trim() || '',
    employment_type: data.employment_type || '',
    experience_level: data.experience_level || '',
    framework: data.framework || '',
    location: data.location?.trim() || '',
    remote: Boolean(data.remote), // Ensure it's a boolean
    requirements: data.requirements?.trim() || '',
    salary_currency: data.salary_currency || 'ETB',
    salary_min: data.salary_min ? Number(data.salary_min) : undefined, // Optional - only include if provided
    salary_max: data.salary_max ? Number(data.salary_max) : undefined, // Optional - only include if provided
    status: data.status || 'draft',
  };

  // Handle required_skills - convert array to string
  if (Array.isArray(data.required_skills) && data.required_skills.length > 0) {
    // Join array items with comma and space
    const skillsArray = data.required_skills as string[];
    payload.required_skills = skillsArray
      .filter((skill) => skill && String(skill).trim()) // Remove empty skills
      .map((skill) => String(skill).trim())
      .join(', ');
  } else if (typeof data.required_skills === 'string') {
    const skillsString = data.required_skills as string;
    payload.required_skills = skillsString.trim() || '';
  } else {
    // If empty, send empty string (backend may require this field)
    payload.required_skills = '';
  }

  

  try {
    const response = await apiClient.post<JobResponse>('/jobs', payload);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export function useCreateJob() {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: createJob,
      onSuccess: async (data) => {
        // Invalidate and refetch jobs list
        await queryClient.invalidateQueries({ queryKey: ['admin', 'jobs'], exact: false });
        
        // Also try to refetch immediately
        await queryClient.refetchQueries({ queryKey: ['admin', 'jobs'], type: 'active'});
  
        toast.success('Job created successfully!', {
          description: `"${data.title}" has been created and is now available.`,
        });
      },
      onError: (error: any) => {
        const errorMessage = error?.message || 'Failed to create job. Please try again.';
        toast.error('Failed to create job', {
          description: errorMessage,
        });
      },
    });
  }