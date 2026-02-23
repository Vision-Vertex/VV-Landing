'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
  company_id?: string;
  company?: {
    id: string;
    name: string;
    description?: string;
    website?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    industry?: string;
    size?: string;
    plan?: string;
    is_active?: boolean;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

async function fetchUserProfile(): Promise<UserProfile> {
  try {
    const response = await apiClient.get<UserProfile>('/auth/me');
    return response;
  } catch (error: any) {
    throw error;
  }
}

export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: fetchUserProfile,
    retry: 1,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

