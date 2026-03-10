import React from 'react';
import { cn } from '@/src/utils/cn';
import { Check, X, Minus } from 'lucide-react';

interface SkillTagProps {
  skill: string;
  status?: 'match' | 'missing' | 'neutral';
  className?: string;
}

export const SkillTag: React.FC<SkillTagProps> = ({ skill, status = 'neutral', className }) => {
  const variants = {
    match: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    missing: 'bg-rose-50 text-rose-700 border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const icons = {
    match: <Check className="w-3 h-3 mr-1" />,
    missing: <X className="w-3 h-3 mr-1" />,
    neutral: <Minus className="w-3 h-3 mr-1" />,
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border', variants[status], className)}>
      {status !== 'neutral' && icons[status]}
      {skill}
    </span>
  );
};
