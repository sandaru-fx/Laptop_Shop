
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div className={`shimmer bg-slate-800 rounded-lg ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="glass rounded-3xl overflow-hidden p-6 space-y-4">
    <Skeleton className="h-48 w-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-6 w-3/4" />
    </div>
    <div className="flex justify-between pt-4">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-24" />
    </div>
  </div>
);
