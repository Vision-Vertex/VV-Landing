import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: boolean;
}

export function LoadingSkeleton({ 
  className, 
  height = "h-4", 
  width = "w-full", 
  rounded = true 
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        height,
        width,
        rounded && "rounded",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-3">
      <LoadingSkeleton height="h-48" rounded />
      <LoadingSkeleton height="h-4" width="w-3/4" />
      <LoadingSkeleton height="h-4" width="w-1/2" />
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <LoadingSkeleton 
          key={i} 
          height="h-4" 
          width={i === lines - 1 ? "w-3/4" : "w-full"} 
        />
      ))}
    </div>
  );
}

export function ImageSkeleton({ aspectRatio = "aspect-video" }: { aspectRatio?: string }) {
  return (
    <div className={cn("animate-pulse bg-gray-200 rounded", aspectRatio)} />
  );
}
