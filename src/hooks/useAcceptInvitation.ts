'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ValidateInvitationResponse {
  valid: boolean;
  invitation?: {
    id: string;
    email: string;
    company_id: string;
    company?: {
      id: string;
      name: string;
    };
    role: string;
    status: string;
    expires_at: string;
    created_at: string;
  };
  message?: string;
}

export interface AcceptInvitationRequest {
  password: string;
  first_name: string;
  last_name: string;
}

export interface AcceptInvitationResponse {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  message: string;
}

// Validate invitation token
async function validateInvitation(token: string): Promise<ValidateInvitationResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/invitations/${token}/validate`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.detail || 'Failed to validate invitation');
  }

  return response.json();
}

// Accept invitation
async function acceptInvitation(
  token: string,
  data: AcceptInvitationRequest
): Promise<AcceptInvitationResponse> {
  const url = `${API_BASE_URL}/auth/invitations/${encodeURIComponent(token)}/accept`;
  const payload = {
    token: token, // Backend requires token in body even though it's also in URL
    password: data.password,
    first_name: data.first_name,
    last_name: data.last_name,
  };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = JSON.parse(responseText);
    } catch {
      errorData = { message: responseText || 'Failed to accept invitation' };
    }
    
    const errorMessage = errorData.message || errorData.detail || errorData.error || 'Failed to accept invitation';
    throw new Error(errorMessage);
  }

  return JSON.parse(responseText);
}

export function useValidateInvitation(token: string | null) {
  return useQuery({
    queryKey: ['invitation', 'validate', token],
    queryFn: () => validateInvitation(token!),
    enabled: !!token,
    retry: false,
  });
}

export function useAcceptInvitation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: AcceptInvitationRequest }) =>
      acceptInvitation(token, data),
    onSuccess: (data) => {
      // Invalidate validation query
      queryClient.invalidateQueries({ queryKey: ['invitation'], exact: false });
      
      toast.success('Invitation accepted!', {
        description: 'Your account has been created successfully. You can now log in.',
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to accept invitation. Please try again.';
      toast.error('Failed to accept invitation', {
        description: errorMessage,
      });
    },
  });
}

