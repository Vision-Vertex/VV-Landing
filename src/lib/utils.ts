import { type ClassValue, clsx } from "clsx"
import { CheckCircle2, Clock, Eye, XCircle } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Performance utilities
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Image optimization helper
export function getImageUrl(path: string, width: number = 800): string {
  // Add image optimization parameters
  return `${path}?w=${width}&q=75&format=webp`;
}

// Lazy loading helper
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


export function parseRequirements(requirements: string | string[] | undefined): string[] {
  if (!requirements) return [];
  
  // If it's already an array, return it (cleaning up any bullet points)
  if (Array.isArray(requirements)) {
    return requirements.map(req => req.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean);
  }
  
  // If it's a string, try to parse it
  if (typeof requirements === 'string') {
    // Try to parse as JSON array first
    try {
      const parsed = JSON.parse(requirements);
      if (Array.isArray(parsed)) {
        return parsed.map(req => req.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean);
      }
    } catch {
      // Not JSON, continue with string parsing
    }
    
    // Split by newlines or bullet points
    const lines = requirements
      .split(/\n|(?=[•\-\*])/)
      .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);
    
    return lines;
  }
  
  return [];
};


export function formatExperienceLevel(level: string): string {
  const levels: Record<string, string> = {
    junior: 'Entry Level',
    mid: 'Mid Level',
    senior: 'Senior',
  };
  return levels[level] || level;
};

export function formatSalary(min: number, max: number, currency: string): string {
  if (!min && !max) return 'Not specified';
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'ETB' ? 'Br' : currency;
  if (min && max) return `${symbol} ${min.toLocaleString()} - ${symbol} ${max.toLocaleString()}`;
  if (min) return `${symbol} ${min.toLocaleString()}+`;
  return `Up to ${symbol} ${max.toLocaleString()}`;
};

export const getStatusBadgeConfig = (status: string) => {
  const statusConfig: Record<string, { bg: string; text: string; border: string; icon: any }> = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: Clock },
    reviewed: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: Eye },
    shortlisted: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle2 },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: XCircle },
    hired: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', icon: CheckCircle2 },
  };

  return statusConfig[status] || statusConfig.pending;
};