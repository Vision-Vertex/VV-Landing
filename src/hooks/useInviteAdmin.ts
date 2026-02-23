'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';

export interface InviteAdminRequest {
  email: string;
}

export interface InviteAdminResponse {
  invitation: {
    id: string;
    email: string;
    token: string;
    status: string;
    expires_at: string;
    created_at: string;
  };
  message: string;
}

async function inviteAdmin(data: InviteAdminRequest): Promise<InviteAdminResponse> {
  try {
    const response = await apiClient.post<InviteAdminResponse>('/auth/invitations', data);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export function useInviteAdmin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: inviteAdmin,
    onSuccess: (data) => {
      // Invalidate invitations queries if they exist
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations'], exact: false });
      
      toast.success('Invitation sent successfully!', {
        description: `An invitation email has been sent to ${data.invitation.email}`,
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to send invitation. Please try again.';
      toast.error('Failed to send invitation', {
        description: errorMessage,
      });
    },
  });
}

