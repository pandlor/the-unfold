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
  { id: 'data-description', label: 'Data Description', path: '/notebook/data-description' },
  { id: 'data-profiling', label: 'Data Profiling', path: '/notebook/data-profiling' },
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
    <div className="bg-muted/30 rounded-lg p-3">
      <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">Progress</h3>
      <div className="space-y-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step.id} className="flex items-center space-x-3">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                  isCompleted && "bg-accent text-accent-foreground",
                  isCurrent && "bg-primary text-primary-foreground",
                  !isCompleted && !isCurrent && "bg-border text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Circle className="w-3 h-3" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm",
                  isCurrent && "text-foreground font-medium",
                  isCompleted && "text-muted-foreground",
                  !isCompleted && !isCurrent && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};