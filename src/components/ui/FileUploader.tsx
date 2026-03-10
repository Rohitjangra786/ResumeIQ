import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X } from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { Button } from './Button';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  accept = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  },
  maxSize = 5242880, // 5MB
  className
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center w-full p-10 border-2 border-dashed rounded-2xl transition-colors cursor-pointer",
        isDragActive ? "border-indigo-500 bg-indigo-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100",
        isDragReject ? "border-rose-500 bg-rose-50" : "",
        className
      )}
    >
      <input {...getInputProps()} />
      
      {selectedFile ? (
        <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200 w-full max-w-md">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-slate-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={removeFile} className="text-slate-400 hover:text-rose-500">
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center border border-slate-100">
            <UploadCloud className={cn("w-8 h-8", isDragActive ? "text-indigo-600" : "text-slate-400")} />
          </div>
          <div>
            <p className="text-base font-medium text-slate-900">
              <span className="text-indigo-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-slate-500 mt-1">
              PDF or DOCX (max. 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
