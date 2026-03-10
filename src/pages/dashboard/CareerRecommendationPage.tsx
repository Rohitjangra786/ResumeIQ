import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { Button } from '@/src/components/ui/Button';
import { dummyData } from '@/src/utils/dummyData';
import { Briefcase, BookOpen, Star, ArrowRight } from 'lucide-react';

export const CareerRecommendationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Career Recommendations</h1>
        <p className="text-sm text-slate-500 mt-1">Discover roles that match your skills and courses to bridge the gap.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            Recommended Roles
          </h2>
          {dummyData.recommendedRoles.map((role, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow border-slate-200/60">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{role.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{role.salary} / year</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{role.match}%</div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Match</div>
                  </div>
                </div>
                <ProgressBar value={role.match} className="mb-6 h-1.5" />
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                  <Button size="sm" className="flex-1">Find Jobs</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Recommended Courses
          </h2>
          {dummyData.courses.map((course, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow border-slate-200/60">
              <CardContent className="p-6 flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <BookOpen className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-slate-900 truncate">{course.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">{course.platform}</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-slate-700">{course.rating}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
