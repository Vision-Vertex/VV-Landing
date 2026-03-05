"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowLeft,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { usePublicJob } from "@/hooks/usePublicJobs";
import { toast } from "sonner";
import { parseRequirements, formatExperienceLevel } from "@/lib/utils";

function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const { data: job, isLoading, error } = usePublicJob(jobId);

  React.useEffect(() => {
    if (error) {
      toast.error("Failed to load job details", {
        description: (error as any)?.message || "Please try again later.",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!job || job.status !== "active") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Job not found
          </h2>
          <p className="text-gray-600 mb-6">
            This job posting is no longer available.
          </p>
          <Button onClick={() => router.push("/careers")}>
            <ArrowLeft size={18} className="mr-2" />
            Back to Careers
          </Button>
        </div>
      </div>
    );
  }

  const requirements = parseRequirements(job.requirements);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/careers">
            <Button variant="outline" className="gap-2 mb-6">
              <ArrowLeft size={18} />
              Back to Careers
            </Button>
          </Link>
        </motion.div>

        {/* Job Details Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
        >
          <div className="space-y-6">
            {/* Title */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  {job.framework && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                      {job.framework}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  {job.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-primary" />
                      <span>
                        {job.location}
                        {job.remote ? " • Remote" : ""}
                      </span>
                    </div>
                  )}
                  {job.employment_type && (
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-secondary" />
                      <span>{job.employment_type}</span>
                    </div>
                  )}
                  {job.experience_level && (
                    <div className="flex items-center gap-2">
                      <Briefcase size={18} className="text-primary" />
                      <span>{formatExperienceLevel(job.experience_level)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {job.description && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Job Description
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            )}

            {/* Requirements */}
            {job.requirements &&
              (() => {
                const requirementsList = parseRequirements(job.requirements);
                return requirementsList.length > 0 ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      Requirements
                    </h2>
                    <ul className="space-y-3">
                      {requirementsList.map((requirement, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                          </div>
                          <span className="text-gray-600 leading-relaxed flex-1">
                            {requirement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      Requirements
                    </h2>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {typeof job.requirements === "string"
                        ? job.requirements
                        : JSON.stringify(job.requirements)}
                    </div>
                  </div>
                );
              })()}

            {/* Required Skills */}
            {job.required_skills && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.required_skills &&
                    (() => {
                      const raw = job.required_skills as string | string[];
                      const skillsArray =
                        typeof raw === "string"
                          ? raw.split(",").map((s: string) => s.trim())
                          : Array.isArray(raw)
                            ? raw
                            : [];
                      return (
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 mb-3">
                            Required Skills
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {skillsArray.map((skill: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                </div>
              </div>
            )}

            {/* Apply Button */}
            <div className="pt-6 border-t border-gray-200">
              <Link href={`/careers/${jobId}/apply`}>
                <Button className="w-full cursor-pointer md:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-12 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Apply for This Position
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default JobDetailPage;
