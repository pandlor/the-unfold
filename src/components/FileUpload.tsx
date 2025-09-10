import { useCallback, useState } from 'react';
import { Upload, File, X, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { FileUploadSkeleton } from '@/components/skeletons/FileUploadSkeleton';
import { NoFilesState } from '@/components/empty-states/NoFilesState';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileUpload?: (files: File[]) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  multiple?: boolean;
}

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  id: string;
}

export const FileUpload = ({ 
  onFileUpload, 
  acceptedTypes = ['.csv', '.json', '.xlsx', '.xls'],
  maxSize = 10,
  multiple = true 
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showUploadArea, setShowUploadArea] = useState(true);
  const { toast } = useToast();

  // Simulate component initialization
  useState(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 800);
    return () => clearTimeout(timer);
  });

  const validateFile = (file: File): boolean => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!acceptedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: `Please upload files with extensions: ${acceptedTypes.join(', ')}`,
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File size must be less than ${maxSize}MB`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const simulateUpload = (file: File, id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(f => 
          f.id === id ? { ...f, progress: 100, status: 'complete' } : f
        ));
        toast({
          title: "File uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } else {
        setUploadedFiles(prev => prev.map(f => 
          f.id === id ? { ...f, progress } : f
        ));
      }
    }, 200);
  };

  const handleFiles = useCallback((files: FileList) => {
    const validFiles: File[] = [];
    
    Array.from(files).forEach(file => {
      if (validateFile(file)) {
        validFiles.push(file);
        const id = Math.random().toString(36).substr(2, 9);
        const uploadedFile: UploadedFile = {
          file,
          progress: 0,
          status: 'uploading',
          id
        };
        
        setUploadedFiles(prev => [...prev, uploadedFile]);
        simulateUpload(file, id);
      }
    });

    if (validFiles.length > 0) {
      onFileUpload?.(validFiles);
    }
  }, [onFileUpload, toast]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const triggerFileInput = () => {
    document.getElementById('file-upload')?.click();
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  if (isInitializing) {
    return <FileUploadSkeleton />;
  }

  return (
    <div className="space-y-4">
      {uploadedFiles.length === 0 && showUploadArea ? (
        <NoFilesState 
          onBrowseFiles={triggerFileInput}
          acceptedTypes={acceptedTypes}
        />
      ) : (
        <Card>
        <CardContent className="p-6">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver 
                ? "border-accent bg-accent/5" 
                : "border-border hover:border-accent/50"
            )}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Upload your data files</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Supported formats: {acceptedTypes.join(', ')} (max {maxSize}MB)
            </p>
            <input
              type="file"
              multiple={multiple}
              accept={acceptedTypes.join(',')}
              onChange={onFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>
      )}
      
      {/* Hidden file input */}
      <input
        type="file"
        multiple={multiple}
        accept={acceptedTypes.join(',')}
        onChange={onFileSelect}
        className="hidden"
        id="file-upload"
      />

      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Uploaded Files</h4>
            <div className="space-y-3">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <File className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    {uploadedFile.status === 'uploading' && (
                      <div className="flex items-center space-x-2">
                        <Progress value={uploadedFile.progress} className="w-full h-2" />
                        <span className="text-xs text-muted-foreground">
                          {Math.round(uploadedFile.progress)}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {uploadedFile.status === 'uploading' && (
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    )}
                    {uploadedFile.status === 'complete' && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(uploadedFile.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};