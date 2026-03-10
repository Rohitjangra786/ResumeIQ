import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { SkillTag } from '@/src/components/ui/SkillTag';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { dummyData } from '@/src/utils/dummyData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export const SkillGapAnalysisPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Skill Gap Analysis</h1>
        <p className="text-sm text-slate-500 mt-1">Compare your skills against industry standards for your target role.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Skill Comparison Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dummyData.skillComparison}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Your Skills" dataKey="user" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                  <Radar name="Required" dataKey="required" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.3} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-3 h-3 rounded-full bg-indigo-600/50 border border-indigo-600"></span>
                Your Skills
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-3 h-3 rounded-full bg-slate-300/50 border border-slate-300"></span>
                Required
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                Verified Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {dummyData.extractedSkills.map((skill, i) => (
                  <SkillTag key={i} skill={skill} status="match" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-100 bg-rose-50/30">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-rose-900">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                Missing Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {dummyData.missingSkills.map((skill, i) => (
                  <SkillTag key={i} skill={skill} status="missing" />
                ))}
              </div>
              <p className="text-sm text-rose-700/80 mt-4 leading-relaxed">
                Acquiring these skills will increase your match rate for Senior Frontend Engineer roles by up to 25%.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {dummyData.skillComparison.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-32 font-medium text-slate-900">{item.name}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-500">You: {item.user}%</span>
                    <span className="text-slate-500">Req: {item.required}%</span>
                  </div>
                  <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-slate-300 transition-all duration-500"
                      style={{ width: `${item.required}%` }}
                    />
                    <div 
                      className={`absolute top-0 left-0 h-full transition-all duration-500 ${item.user >= item.required ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                      style={{ width: `${item.user}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
