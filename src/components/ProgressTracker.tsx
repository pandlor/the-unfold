import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

interface Step {
  id: string;
  label: string;
  path: string;
}

const steps: Step[] = [
  { id: 'data-upload', label: 'Data Upload', path: '/notebook/data-upload' },
  { id: 'data-profiling', label: 'Data Profiling', path: '/notebook/data-profiling' },
  { id: 'data-description', label: 'Data Description', path: '/notebook/data-description' },
  { id: 'hypotheses', label: 'Hypotheses', path: '/notebook/hypotheses' },
  { id: 'analysis', label: 'Analysis', path: '/notebook/analysis' },
  { id: 'report', label: 'Report', path: '/notebook/report' },
];

export const ProgressTracker = () => {
  const location = useLocation();
  
  const getCurrentStepIndex = () => {
    const currentStep = steps.findIndex(step => 
      location.pathname.includes(step.id)
    );
    return currentStep >= 0 ? currentStep : 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Analysis Progress</h3>
      <div className="flex items-center space-x-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                    isCompleted && "bg-accent text-accent-foreground",
                    isCurrent && "bg-primary text-primary-foreground",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:inline",
                    isCurrent && "text-foreground",
                    !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-px w-8 mx-2",
                    isCompleted ? "bg-accent" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};