"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ApplicationFormData {
  job_id: string;
  candidate_name: string;
  candidate_email: string;
  candidate_phone?: string;
  cover_letter?: string;
  resume?: File | string; // Can be file or URL/path
}

export interface ApplicationResponse {
  id: string;
  job_id: string;
  candidate_name: string;
  candidate_email: string;
  status: string;
  created_at: string;
  [key: string]: any;
}

// Upload file and get path/URL (if backend has upload endpoint)
async function uploadResume(file: File): Promise<string> {
  // Try multiple possible upload endpoints
  const possibleEndpoints = [
    "/upload/resume",
    "/upload",
    "/files/upload",
    "/resume/upload",
  ];

  for (const endpoint of possibleEndpoints) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("resume", file); // Try both 'file' and 'resume' field names

      const uploadResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const uploadData = await uploadResponse.json();
        // Return the path/URL from response (adjust based on your backend response structure)
        const path =
          uploadData.path ||
          uploadData.url ||
          uploadData.resume_path ||
          uploadData.file_path ||
          "";
        if (path) {
          return path;
        }
      }
    } catch (error) {
      continue;
    }
  }

  // If no upload endpoint works, use filename as fallback
  // The backend might handle file upload differently or expect just the filename
  return file.name;
}

async function applyToJob(
  data: ApplicationFormData,
): Promise<ApplicationResponse> {
  // Check if we have a file to upload - use multipart/form-data
  const hasFile = data.resume instanceof File;

  let response: Response;

  if (hasFile) {
    // Use multipart/form-data for file upload
    const formData = new FormData();
    formData.append("candidate_name", data.candidate_name);
    formData.append("candidate_email", data.candidate_email);

    if (data.candidate_phone) {
      formData.append("candidate_phone", data.candidate_phone);
    }

    if (data.cover_letter) {
      formData.append("cover_letter", data.cover_letter);
    }

    // Append the resume file
    formData.append("resume", data.resume as Blob);

    response = await fetch(`${API_BASE_URL}/jobs/${data.job_id}/apply`, {
      method: "POST",
      // Don't set Content-Type header - browser will set it with boundary
      body: formData,
    });
  } else {
    // Use JSON for backward compatibility (no file)
    const requestBody: {
      candidate_name: string;
      candidate_email: string;
      candidate_phone?: string;
      cover_letter?: string;
      resume_path?: string;
    } = {
      candidate_name: data.candidate_name,
      candidate_email: data.candidate_email,
    };

    if (data.candidate_phone) {
      requestBody.candidate_phone = data.candidate_phone;
    }

    if (data.cover_letter) {
      requestBody.cover_letter = data.cover_letter;
    }

    if (data.resume && typeof data.resume === "string") {
      requestBody.resume_path = data.resume;
    }

    response = await fetch(`${API_BASE_URL}/jobs/${data.job_id}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    let error: any = {};

    try {
      error = JSON.parse(errorText);
    } catch {
      error = {
        message:
          errorText || response.statusText || "Failed to submit application",
      };
    }

    throw new Error(
      error.message ||
        error.detail ||
        error.error ||
        (typeof error === "string" ? error : "Failed to submit application"),
    );
  }

  const result = await response.json();
  return result;
}

export function useApplyJob() {
  return useMutation({
    mutationFn: applyToJob,
    onSuccess: () => {
      toast.success("Application submitted successfully!", {
        description:
          "We have received your application and will review it shortly.",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "Failed to submit application. Please try again.";
      toast.error("Application failed", {
        description: errorMessage,
      });
    },
  });
}
