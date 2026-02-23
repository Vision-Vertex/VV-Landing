'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';

async function deleteJob(jobId: string): Promise<void> {
  try {
    await apiClient.delete(`/jobs/${jobId}`);
  } catch (error: any) {
    throw error;
  }
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: async (_, jobId) => {
      // Invalidate and refetch jobs queries
      await queryClient.invalidateQueries({ queryKey: ['admin', 'jobs'], exact: false });
      await queryClient.removeQueries({ queryKey: ['admin', 'jobs', jobId] });
      
      toast.success('Job deleted successfully!', {
        description: 'The job posting has been removed.',
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to delete job. Please try again.';
      toast.error('Failed to delete job', {
        description: errorMessage,
      });
    },
  });
}

