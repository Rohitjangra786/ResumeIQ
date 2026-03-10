import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { FileUploader } from '@/src/components/ui/FileUploader';
import { Button } from '@/src/components/ui/Button';
import { analyzeResume } from '@/src/services/api';
import { FileText, CheckCircle2 } from 'lucide-react';

export const ResumeUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      await analyzeResume(file);
      setProgress(100);
      setTimeout(() => {
        navigate('/dashboard/skills');
      }, 500);
    } catch (error) {
      console.error(error);
    } finally {
      clearInterval(interval);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analyze Resume</h1>
        <p className="text-sm text-slate-500 mt-1">Upload your latest resume to get AI-powered career insights.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader onFileSelect={setFile} />
          
          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              disabled={!file || isAnalyzing}
              onClick={handleAnalyze}
              className="w-full sm:w-auto"
            >
              {isAnalyzing ? `Analyzing (${progress}%)` : 'Start Analysis'}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm font-medium text-slate-600">
                <span>Processing document...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${progress > 30 ? 'text-emerald-500' : 'text-slate-300'}`} />
                  Extracting text
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${progress > 60 ? 'text-emerald-500' : 'text-slate-300'}`} />
                  Identifying skills
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${progress > 90 ? 'text-emerald-500' : 'text-slate-300'}`} />
                  Matching roles
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-indigo-50/50 border-indigo-100">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-indigo-900 mb-1">Privacy First</h4>
            <p className="text-sm text-indigo-700/80 leading-relaxed">
              Your resume is processed securely and never shared with third parties. We only extract professional data to provide you with personalized career insights.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
