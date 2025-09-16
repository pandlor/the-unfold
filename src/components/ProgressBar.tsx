import { Target, TrendingUp, FileOutput, Check, Circle } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

const ProgressBar = () => {
  const location = useLocation();
  const { projectId } = useParams();

  const steps = [
    {
      icon: Target,
      label: "Hypotheses",
      path: `/project/${projectId}/notebook/hypotheses`
    },
    {
      icon: TrendingUp,
      label: "Analysis",
      path: `/project/${projectId}/notebook/analysis`
    },
    {
      icon: FileOutput,
      label: "Report",
      path: `/project/${projectId}/notebook/report`
    }
  ];

  // Get current step index for progress calculation
  const getCurrentStepIndex = () => {
    const stepIds = ['hypotheses', 'analysis', 'report'];
    const currentStep = stepIds.find(step => location.pathname.includes(step));
    return currentStep ? stepIds.indexOf(currentStep) : 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="bg-card border-b border-border px-8 py-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Analysis Workflow</h2>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = location.pathname === step.path;
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={index} className="flex items-center">
                <div className="flex items-center space-x-3">
                  {/* Progress Circle */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      isCompleted && "text-white",
                      isCurrent && "bg-primary text-primary-foreground", 
                      !isCompleted && !isCurrent && "bg-border text-muted-foreground"
                    )}
                    style={isCompleted ? { backgroundColor: '#12d9b3' } : {}}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-sm font-medium",
                      isActive ? "text-primary" : "text-foreground"
                    )}>
                      {step.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Step {index + 1} of {steps.length}
                    </span>
                  </div>
                </div>
                
                {/* Progress Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 h-0.5 bg-border">
                    <div 
                      className="h-full bg-green-400 transition-all duration-300"
                      style={{ 
                        width: isCompleted ? '100%' : '0%'
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;