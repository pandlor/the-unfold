import { Button } from "@/components/ui/button";
import { Upload, BarChart3, FileText, Target, TrendingUp, FileOutput, Check, Circle } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

const AnalysisSidebar = () => {
  const location = useLocation();
  const { projectId } = useParams();

  const navigationItems = [
    {
      icon: Upload,
      label: "Data Upload",
      path: `/project/${projectId}/notebook/data-upload`
    },
    {
      icon: BarChart3,
      label: "Data Profiling",
      path: `/project/${projectId}/notebook/data-profiling`
    },
    {
      icon: FileText,
      label: "Data Description",
      path: `/project/${projectId}/notebook/data-description`
    },
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
    const stepIds = ['data-upload', 'data-profiling', 'data-description', 'hypotheses', 'analysis', 'report'];
    const currentStep = stepIds.find(step => location.pathname.includes(step));
    return currentStep ? stepIds.indexOf(currentStep) : 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <aside className="w-64 bg-card border-r border-border p-4 flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Analysis Workflow</h2>
        
        {/* Navigation Items with Progress Circles */}
        <nav className="space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={index} className="flex items-center space-x-3">
                {/* Progress Circle */}
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                    isCompleted && "text-white",
                    isCurrent && "bg-primary text-primary-foreground", 
                    !isCompleted && !isCurrent && "bg-border text-muted-foreground"
                  )}
                  style={isCompleted ? { backgroundColor: '#12d9b3' } : {}}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Circle className="w-3 h-3" />
                  )}
                </div>
                
                {/* Navigation Button */}
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "flex-1 justify-start text-sm font-normal",
                    isActive
                      ? "bg-primary/10 text-primary hover:bg-primary/15"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  asChild
                >
                  <Link to={item.path}>
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Link>
                </Button>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AnalysisSidebar;