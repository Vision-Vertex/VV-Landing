"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

export interface Application {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  cover_letter?: string;
  resume_url?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export interface ApplicationsResponse {
  applications: Application[];
  total?: number;
}

async function fetchApplications(jobId: string): Promise<ApplicationsResponse> {
  try {
    const response = await apiClient.get<ApplicationsResponse>(
      `/applications?job_posting_id=${jobId}`,
    );
    return response;
  } catch (error: any) {
    throw error;
  }
}

export function useApplications(jobId: string) {
  return useQuery({
    queryKey: ["admin", "jobs", jobId, "applications"],
    queryFn: () => fetchApplications(jobId),
    enabled: !!jobId,
  });
}
