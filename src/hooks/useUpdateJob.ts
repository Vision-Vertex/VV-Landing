"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import { JobResponse } from "@/types/jobs";

export interface UpdateJobData {
  title?: string;
  description?: string;
  employment_type?: string;
  experience_level?: string;
  framework?: string;
  location?: string;
  remote?: boolean;
  required_skills?: string[];
  requirements?: string;
  salary_currency?: string;
  salary_min?: number;
  salary_max?: number;
  status?: string;
  is_active?: boolean;
}

async function updateJob(
  jobId: string,
  data: UpdateJobData,
): Promise<JobResponse> {
  const payload: Record<string, any> = {};

  if (data.title !== undefined) payload.title = data.title?.trim() || "";
  if (data.description !== undefined)
    payload.description = data.description?.trim() || "";
  if (data.employment_type !== undefined)
    payload.employment_type = data.employment_type || "";
  if (data.experience_level !== undefined)
    payload.experience_level = data.experience_level || "";
  if (data.framework !== undefined) payload.framework = data.framework || "";
  if (data.location !== undefined)
    payload.location = data.location?.trim() || "";
  if (data.remote !== undefined) payload.remote = Boolean(data.remote);
  if (data.requirements !== undefined)
    payload.requirements = data.requirements?.trim() || "";
  if (data.salary_currency !== undefined)
    payload.salary_currency = data.salary_currency || "ETB";
  if (data.salary_min !== undefined)
    payload.salary_min = data.salary_min ? Number(data.salary_min) : undefined;
  if (data.salary_max !== undefined)
    payload.salary_max = data.salary_max ? Number(data.salary_max) : undefined;
  if (data.status !== undefined) payload.status = data.status || "draft";
  if (data.is_active !== undefined) payload.is_active = Boolean(data.is_active);

  // Handle required_skills - convert array to string
  if (data.required_skills !== undefined) {
    if (
      Array.isArray(data.required_skills) &&
      data.required_skills.length > 0
    ) {
      payload.required_skills = data.required_skills
        .filter((skill) => skill && String(skill).trim())
        .map((skill) => String(skill).trim())
        .join(", ");
    } else if (typeof data.required_skills === "string") {
      payload.required_skills = (data.required_skills as string).trim() || "";
    } else {
      payload.required_skills = "";
    }
  }

  try {
    const response = await apiClient.put<JobResponse>(
      `/jobs/${jobId}`,
      payload,
    );
    return response;
  } catch (error: any) {
    throw error;
  }
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, data }: { jobId: string; data: UpdateJobData }) =>
      updateJob(jobId, data),
    onSuccess: async (data, variables) => {
      // Invalidate and refetch jobs queries
      await queryClient.invalidateQueries({
        queryKey: ["admin", "jobs"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["admin", "jobs", variables.jobId],
      });

      toast.success("Job updated successfully!", {
        description: `"${data.title}" has been updated.`,
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "Failed to update job. Please try again.";
      toast.error("Failed to update job", {
        description: errorMessage,
      });
    },
  });
}
