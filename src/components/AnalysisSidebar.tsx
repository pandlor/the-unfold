import { Button } from "@/components/ui/button";
import { Upload, BarChart3, FileText, Target, TrendingUp, FileOutput } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ProgressTracker } from "@/components/ProgressTracker";

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

  return (
    <aside className="w-64 bg-card border-r border-border p-4 flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Analysis Workflow</h2>
        
        {/* Progress Tracker */}
        <div className="mb-6">
          <ProgressTracker />
        </div>
        
        {/* Navigation Items */}
        <nav className="space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={index}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start text-sm font-normal ${
                  isActive
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                asChild
              >
                <Link to={item.path}>
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AnalysisSidebar;