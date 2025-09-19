import { BarChart3, TrendingUp, FileText, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface NoAnalysisStateProps {
  title?: string;
  description?: string;
  currentStep?: string;
  nextStepPath?: string;
  nextStepLabel?: string;
  projectId?: string;
}

export const NoAnalysisState = ({ 
  title = "No Analysis Results Yet",
  description = "Complete the previous steps to see your analysis results here.",
  currentStep = "data-upload",
  nextStepPath,
  nextStepLabel = "Get Started",
  projectId
}: NoAnalysisStateProps) => {
  
  const getStepInfo = (step: string) => {
    const steps = {
      'data-upload': { 
        icon: FileText, 
        label: 'Upload your data files',
        path: `/project/${projectId}/notebook/data-upload`
      },
      'data-description': { 
        icon: FileText, 
        label: 'Describe your data context',
        path: `/project/${projectId}/notebook/data-description`
      },
      'data-profiling': { 
        icon: BarChart3, 
        label: 'Profile your data structure',
        path: `/project/${projectId}/notebook/data-profiling`
      },
      'hypotheses': { 
        icon: Lightbulb, 
        label: 'Define your hypotheses',
        path: `/project/${projectId}/notebook/hypotheses`
      }
    };
    
    return steps[step as keyof typeof steps] || steps['data-upload'];
  };

  const stepInfo = getStepInfo(currentStep);
  const finalNextStepPath = nextStepPath || stepInfo.path;

  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardContent className="flex flex-col items-center justify-center py-12 px-8 text-center">
        <div className="relative mb-6">
          {/* Illustration */}
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Lightbulb className="w-3 h-3 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 max-w-md">
          <h3 className="text-lg font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground">
            {description}
          </p>
          
          {/* Next step suggestion */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <stepInfo.icon className="w-4 h-4" />
              <span>Next step: {stepInfo.label}</span>
            </div>
            
            {finalNextStepPath && (
              <Button asChild variant="outline" size="sm">
                <Link to={finalNextStepPath} className="gap-2">
                  {nextStepLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
          
          {/* Progress indicators */}
          <div className="grid grid-cols-4 gap-2 pt-4">
            {['Upload', 'Describe', 'Profile', 'Analyze'].map((step, index) => (
              <div key={step} className="flex flex-col items-center space-y-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  index === 0 ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <span className="text-xs text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};