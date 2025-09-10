import { Upload, FileSpreadsheet, MousePointer2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface NoFilesStateProps {
  onBrowseFiles: () => void;
  acceptedTypes?: string[];
}

export const NoFilesState = ({ onBrowseFiles, acceptedTypes = ['.csv', '.json', '.xlsx'] }: NoFilesStateProps) => {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/25 bg-gradient-to-br from-muted/30 to-transparent">
      <CardContent className="flex flex-col items-center justify-center py-12 px-8 text-center">
        <div className="relative mb-8">
          {/* Animated illustration */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
              <Upload className="w-10 h-10 text-accent" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce">
              <FileSpreadsheet className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 max-w-sm">
          <h3 className="text-xl font-semibold text-foreground">
            Ready to Upload Your Data?
          </h3>
          <p className="text-muted-foreground">
            Drag and drop your files here, or click browse to get started with your analysis.
          </p>
          
          <div className="pt-2">
            <Button 
              onClick={onBrowseFiles}
              variant="outline"
              size="lg"
              className="gap-2 border-dashed"
            >
              <MousePointer2 className="w-4 h-4" />
              Browse Files
            </Button>
          </div>
          
          {/* Supported formats */}
          <div className="pt-4 space-y-2">
            <p className="text-xs text-muted-foreground font-medium">
              SUPPORTED FORMATS
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {acceptedTypes.map((type, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          
          {/* Tips */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ArrowRight className="w-3 h-3" />
              <span>Max file size: 10MB</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ArrowRight className="w-3 h-3" />
              <span>Multiple files supported</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};