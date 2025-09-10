import { Button } from "@/components/ui/button";
import { Upload, BarChart3, FileText, Lightbulb, Activity, FileBarChart } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

const AnalysisSidebar = () => {
  const location = useLocation();
  const { projectId } = useParams();

  const navigationItems = [
    {
      icon: Upload,
      label: "data upload",
      path: `/project/${projectId}/notebook/data-upload`
    },
    {
      icon: BarChart3,
      label: "data profiling",
      path: `/project/${projectId}/notebook/data-profiling`
    },
    {
      icon: FileText,
      label: "data description",
      path: `/project/${projectId}/notebook/data-description`
    },
    {
      icon: Lightbulb,
      label: "hypotheses",
      path: `/project/${projectId}/notebook/hypotheses`
    },
    {
      icon: Activity,
      label: "analysis",
      path: `/project/${projectId}/notebook/analysis`
    },
    {
      icon: FileBarChart,
      label: "report",
      path: `/project/${projectId}/notebook/report`
    }
  ];

  return (
    <aside className="w-48 bg-muted/30 border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">Analysis Steps</h3>
      </div>
      
      <nav className="flex-1 p-3 space-y-1">
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
    </aside>
  );
};

export default AnalysisSidebar;