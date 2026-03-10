import React from 'react';
import { cn } from '@/src/utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  className, 
  indicatorClassName,
  showLabel = false
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-xs font-medium text-slate-500">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}>
        <div
          className={cn("h-full bg-indigo-600 transition-all duration-500 ease-in-out", indicatorClassName)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
