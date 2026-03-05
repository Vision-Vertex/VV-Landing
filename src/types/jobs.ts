// src/types/jobs.ts

// ========== FORM DATA ==========
export interface JobFormData {
    title: string;
    description: string;
    employment_type: string;
    experience_level: string;
    framework: string;
    location: string;
    remote: boolean;
    required_skills: string[];
    requirements: string;
    salary_currency: string;
    salary_min: number;
    salary_max: number;
    status: string;
  }
  
  // ========== API RESPONSES ==========
  export interface JobResponse extends JobFormData {
    id: string;
    created_at: string;
    updated_at: string;
    [key: string]: any;
  }
  
  export interface JobListingItem {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    description: string;
    requirements: string[];
    status?: 'draft' | 'active' | 'closed';
    created_at?: string;
  }
  
  export interface ApiResponse<T> {
    data?: T;
    message?: string;
    error?: string;
    status: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  // ========== UI TYPES ==========
  export interface FormErrors {
    [key: string]: string;
  }
  
  export interface QueryOptions {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }
  
  export interface SelectOption {
    value: string;
    label: string;
  }
  
  // ========== DROPDOWN CONSTANTS ==========
  export const EMPLOYMENT_TYPES: SelectOption[] = [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Freelance', label: 'Freelance' },
  ];
  
  export const EXPERIENCE_LEVELS: SelectOption[] = [
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior' },
  ];
  
  export const FRAMEWORKS: SelectOption[] = [
    { value: 'React', label: 'React' },
    { value: 'Next.js', label: 'Next.js' },
    { value: 'Vue', label: 'Vue' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: '.NET', label: '.NET' },
    { value: 'Other', label: 'Other' },
  ];
  
  export const CURRENCIES: SelectOption[] = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'ETB', label: 'ETB (Br)' },
    { value: 'CAD', label: 'CAD ($)' },
    { value: 'AUD', label: 'AUD ($)' },
  ];
  
  export const JOB_STATUSES: SelectOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'closed', label: 'Closed' },
  ];
  
  // Helper to get values array for selects
  export const getSelectValues = (options: SelectOption[]): string[] => 
    options.map(opt => opt.value);