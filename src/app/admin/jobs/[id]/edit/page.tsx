'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, MapPin, DollarSign, Layers, Clock, Save, X, Plus,
  CheckCircle2, AlertCircle, Loader2, ArrowLeft
} from 'lucide-react';
import { useUpdateJob } from '@/hooks/useUpdateJob';
import { useJob } from '@/hooks/useJobs';
import { 
  JobFormData, 
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  FRAMEWORKS,
  CURRENCIES,
  JOB_STATUSES,
  getSelectValues
} from '@/types/jobs';

// Use constants in your component:
const employmentTypes = getSelectValues(EMPLOYMENT_TYPES);
const experienceLevels = getSelectValues(EXPERIENCE_LEVELS);
const frameworks = getSelectValues(FRAMEWORKS);
const currencies = getSelectValues(CURRENCIES);
const statuses = getSelectValues(JOB_STATUSES);

const initialFormData: JobFormData = {
  title: '',
  description: '',
  employment_type: '',
  experience_level: '',
  framework: '',
  location: '',
  remote: false,
  required_skills: [],
  requirements: '',
  salary_currency: 'USD', 
  salary_min: 0,
  salary_max: 0,
  status: 'draft',
};

// --- Main Component ---
export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const { data: job, isLoading: isLoadingJob, error: jobError } = useJob(jobId);
  const { mutate: updateJob, isPending, error, reset } = useUpdateJob();
  
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [skillInput, setSkillInput] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load job data into form when job is fetched
  useEffect(() => {
    if (job) {
      // Parse required_skills - handle both string and array
      const skills = typeof job.required_skills === 'string' 
        ? (job.required_skills as string).split(',').map((s: string) => s.trim()).filter(Boolean)
        : Array.isArray(job.required_skills)
        ? (job.required_skills as string[]).map(s => String(s).trim()).filter(Boolean)
        : [];

      // Parse requirements - might be JSON string or plain string
      let requirementsText = '';
      if (job.requirements) {
        try {
          // Try to parse as JSON array first
          const parsed = JSON.parse(job.requirements);
          if (Array.isArray(parsed)) {
            requirementsText = parsed.join('\n');
          } else {
            requirementsText = job.requirements;
          }
        } catch {
          // If not JSON, use as-is
          requirementsText = job.requirements;
        }
      }

      const loadedFormData = {
        title: job.title || '',
        description: job.description || '',
        employment_type: job.employment_type || '',
        experience_level: job.experience_level || '',
        framework: job.framework || '',
        location: job.location || '',
        remote: Boolean(job.remote),
        required_skills: skills,
        requirements: requirementsText,
        salary_currency: job.salary_currency || 'ETB',
        salary_min: job.salary_min ?? undefined,
        salary_max: job.salary_max ?? undefined,
        status: job.status || 'draft',
      };

      setFormData(loadedFormData);
    }
  }, [job]);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, remote: checked }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.required_skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        required_skills: [...prev.required_skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      required_skills: prev.required_skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title || !formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    if (!formData.description || !formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }
    if (!formData.employment_type) {
      newErrors.employment_type = 'Employment type is required';
    }
    if (!formData.experience_level) {
      newErrors.experience_level = 'Experience level is required';
    }
    if (!formData.location || !formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    // Salary is optional, but if provided, validate it
    if (formData.salary_min !== undefined && formData.salary_min !== null && formData.salary_min < 0) {
      newErrors.salary_min = 'Minimum salary must be positive';
    }
    if (formData.salary_max !== undefined && formData.salary_max !== null && formData.salary_max < 0) {
      newErrors.salary_max = 'Maximum salary must be positive';
    }
    if (formData.salary_min && formData.salary_max && formData.salary_max < formData.salary_min) {
      newErrors.salary_max = 'Maximum salary must be greater than minimum';
    }
    
    setFormErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  // --- Submit Handler (using TanStack Query) ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Ensure salary_currency is always set to ETB
    const updateData = {
      ...formData,
      salary_currency: formData.salary_currency || 'ETB',
      // Only include salary fields if they have values
      salary_min: formData.salary_min && formData.salary_min > 0 ? formData.salary_min : undefined,
      salary_max: formData.salary_max && formData.salary_max > 0 ? formData.salary_max : undefined,
    };
    
    updateJob(
      { jobId, data: updateData },
      {
        onSuccess: (data) => {
          // Toast notification is handled in the hook
          setTimeout(() => {
            router.push(`/admin/jobs/${jobId}`);
          }, 1500);
        },
        onError: (error) => {
          // Error toast is handled in the hook
        },
      }
    );
  };

  // --- Reusable Classes ---
  const inputClasses = "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200";
  const textareaClasses = "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 resize-none";
  const labelClasses = "text-gray-800 font-semibold mb-2 block text-sm";
  const errorClasses = "text-red-500 text-sm mt-1 flex items-center gap-1";
  const selectTriggerClasses = "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200";

  // Loading state
  if (isLoadingJob || !job) {
    return (
      <div className="relative min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  // Error state
  if (jobError) {
    return (
      <div className="relative min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
          <p className="text-gray-600 mb-6">The job you're trying to edit doesn't exist or has been removed.</p>
          <Button onClick={() => router.push('/admin/jobs')}>
            <ArrowLeft size={18} className="mr-2" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-10">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Briefcase size={16} />
            Edit Job Position
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Edit{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Job Posting
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Update the details below to modify this job posting. All fields marked with * are required.
          </motion.p>
        </motion.div>

        {/* API Error from TanStack Query */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border-2 border-red-300 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <span className="text-red-800 font-medium block">Error</span>
              <span className="text-red-700 text-sm">{error.message}</span>
              <button onClick={reset} className="text-red-600 text-sm font-medium mt-2 hover:underline">
                Dismiss
              </button>
            </div>
          </motion.div>
        )}

        {/* Debug: Show current form data values */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg text-xs">
            <p className="font-semibold mb-2">Debug - Form Data:</p>
            <p>Employment Type: "{formData.employment_type}"</p>
            <p>Experience Level: "{formData.experience_level}"</p>
            <p>Framework: "{formData.framework}"</p>
            <p>Status: "{formData.status}"</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-20">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Briefcase className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label className={labelClasses}>Job Title *</Label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Full-Stack Developer"
                  className={cn(inputClasses, formErrors.title && 'border-red-500')}
                  disabled={isPending}
                />
                {formErrors.title && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.title}</p>}
              </div>

              <div>
                <Label className={labelClasses}>Job Description *</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the role..."
                  rows={6}
                  className={cn(textareaClasses, formErrors.description && 'border-red-500')}
                  disabled={isPending}
                />
                {formErrors.description && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.description}</p>}
              </div>

              <div>
                <Label className={labelClasses}>Requirements *</Label>
                <Textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="List qualifications..."
                  rows={5}
                  className={textareaClasses}
                  disabled={isPending}
                />
              </div>
            </div>
          </motion.div>

          {/* Job Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Layers className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className={labelClasses}>Employment Type *</Label>
                <Select 
                  key={`employment-${formData.employment_type}`}
                  value={formData.employment_type || undefined} 
                  onValueChange={(v) => handleSelectChange('employment_type', v)} 
                  disabled={isPending}
                >
                  <SelectTrigger className={cn(selectTriggerClasses, formErrors.employment_type && 'border-red-500')}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    {employmentTypes.map((t) => <SelectItem key={t} value={t} className="text-gray-900">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                {formErrors.employment_type && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.employment_type}</p>}
              </div>

              <div>
                <Label className={labelClasses}>Experience Level *</Label>
                <Select 
                  key={`experience-${formData.experience_level}`}
                  value={formData.experience_level || undefined} 
                  onValueChange={(v) => handleSelectChange('experience_level', v)} 
                  disabled={isPending}
                >
                  <SelectTrigger className={cn(selectTriggerClasses, formErrors.experience_level && 'border-red-500')}>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    {experienceLevels.map((l) => <SelectItem key={l} value={l} className="text-gray-900">{l}</SelectItem>)}
                  </SelectContent>
                </Select>
                {formErrors.experience_level && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.experience_level}</p>}
              </div>

              <div>
                <Label className={labelClasses}>Primary Framework</Label>
                <Select 
                  key={`framework-${formData.framework}`}
                  value={formData.framework || undefined} 
                  onValueChange={(v) => handleSelectChange('framework', v)} 
                  disabled={isPending}
                >
                  <SelectTrigger className={selectTriggerClasses}>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    {frameworks.map((f) => <SelectItem key={f} value={f} className="text-gray-900">{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className={labelClasses}>Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Addis Ababa, Ethiopia"
                    className={cn(inputClasses, 'pl-12', formErrors.location && 'border-red-500')}
                    disabled={isPending}
                  />
                </div>
                {formErrors.location && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.location}</p>}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Remote Position</p>
                      <p className="text-sm text-gray-600">Allow candidates to work remotely</p>
                    </div>
                  </div>
                  <Switch checked={formData.remote} onCheckedChange={handleSwitchChange} disabled={isPending} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills & Compensation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <DollarSign className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Skills & Compensation</h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label className={labelClasses}>Required Skills</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Add skill + Enter"
                    className={inputClasses}
                    disabled={isPending}
                  />
                  <Button type="button" onClick={addSkill} variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-4" disabled={isPending || !skillInput.trim()}>
                    <Plus size={18} />
                  </Button>
                </div>
                {formData.required_skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.required_skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-2 border-primary/20 px-3 py-1 text-sm flex items-center gap-2">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500" disabled={isPending}><X size={14}/></button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className={labelClasses}>Min Salary (Optional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <Input name="salary_min" type="number" value={formData.salary_min || ''} onChange={handleInputChange} placeholder="0" className={cn(inputClasses, 'pl-12', formErrors.salary_min && 'border-red-500')} disabled={isPending} />
                  </div>
                  {formErrors.salary_min && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.salary_min}</p>}
                </div>
                <div>
                  <Label className={labelClasses}>Max Salary (Optional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <Input name="salary_max" type="number" value={formData.salary_max || ''} onChange={handleInputChange} placeholder="0" className={cn(inputClasses, 'pl-12', formErrors.salary_max && 'border-red-500')} disabled={isPending} />
                  </div>
                  {formErrors.salary_max && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.salary_max}</p>}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Clock className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Publication Status</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statuses.map((status) => (
                <button key={status} type="button" onClick={() => handleSelectChange('status', status)} disabled={isPending}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${formData.status === status ? 'border-primary bg-primary/5 text-primary' : 'border-gray-300 hover:border-primary/50 text-gray-700 bg-gray-50'} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {formData.status === status && <CheckCircle2 size={18} />}
                  <span className="font-medium capitalize">{status}</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3"><strong>Draft:</strong> Save later | <strong>Active:</strong> Publish now | <strong>Closed:</strong> Stop applications</p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button type="button" variant="outline" onClick={() => router.push(`/admin/jobs/${jobId}`)} className="px-8 py-6 text-lg border-2 border-gray-300 hover:bg-gray-100 text-gray-700" disabled={isPending}>
              <X size={18} className="mr-2" /> Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 min-w-[200px]">
              {isPending ? <><Loader2 size={18} className="mr-2 animate-spin" /> Updating...</> : <><Save size={18} className="mr-2" /> Update Job Posting</>}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

// Helper
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

