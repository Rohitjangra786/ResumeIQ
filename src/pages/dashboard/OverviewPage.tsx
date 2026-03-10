import React from 'react';
import { FileText, Target, AlertCircle, TrendingUp } from 'lucide-react';
import { StatCard } from '@/src/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { SkillTag } from '@/src/components/ui/SkillTag';
import { dummyData } from '@/src/utils/dummyData';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';

export const OverviewPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, John. Here's your career intelligence summary.</p>
        </div>
        <Link to="/dashboard/upload">
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Analyze New Resume
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Resume Score"
          value={`${dummyData.resumeScore}/100`}
          icon={<FileText className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Skill Match"
          value={`${dummyData.skillMatchPercentage}%`}
          icon={<Target className="w-6 h-6" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Missing Skills"
          value={dummyData.missingSkills.length}
          icon={<AlertCircle className="w-6 h-6" />}
          trend={{ value: 2, isPositive: false }}
        />
        <StatCard
          title="Career Matches"
          value={dummyData.recommendedRoles.length}
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Recommended Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dummyData.recommendedRoles.map((role, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{role.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">Est. Salary: {role.salary}</p>
                  </div>
                  <div className="w-32 text-right">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-500">Match</span>
                      <span className="text-indigo-600">{role.match}%</span>
                    </div>
                    <ProgressBar value={role.match} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critical Missing Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {dummyData.missingSkills.map((skill, i) => (
                <SkillTag key={i} skill={skill} status="missing" />
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="text-sm font-medium text-slate-900 mb-3">Top Verified Skills</h4>
              <div className="flex flex-wrap gap-2">
                {dummyData.extractedSkills.slice(0, 5).map((skill, i) => (
                  <SkillTag key={i} skill={skill} status="match" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
