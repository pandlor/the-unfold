import { Button } from "@/components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home, FolderOpen, BookOpen, Upload, BarChart3, FileText, Target, TrendingUp, FileOutput } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";

const Header = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const { projects } = useProjects();

  // Get the current project name
  const currentProject = projects.find(p => p.id === projectId);
  const projectName = currentProject?.name || `Project ${projectId}`;

  // Get the first notebook name (or default if none)
  const notebookName = currentProject?.notebooks?.[0]?.name || "Main Notebook";

  // Analysis step mapping
  const analysisSteps: Record<string, { label: string; icon: any }> = {
    'data-upload': { label: 'Data Upload', icon: Upload },
    'data-profiling': { label: 'Data Profiling', icon: BarChart3 },
    'data-description': { label: 'Data Description', icon: FileText },
    'hypotheses': { label: 'Hypotheses', icon: Target },
    'analysis': { label: 'Analysis', icon: TrendingUp },
    'report': { label: 'Report', icon: FileOutput },
  };

  // Get current analysis step from URL
  const getCurrentStep = () => {
    const pathParts = location.pathname.split('/');
    const stepIndex = pathParts.findIndex(part => part === 'notebook') + 1;
    return pathParts[stepIndex];
  };

  const currentStep = getCurrentStep();
  const stepInfo = currentStep ? analysisSteps[currentStep] : null;

  // Determine breadcrumb based on current path
  const getBreadcrumbItems = () => {
    const items = [];

    // Always start with Projects
    items.push({
      label: "Projects",
      icon: Home,
      path: "/",
      isCurrent: location.pathname === "/"
    });

    // Add project if we're in a project context
    if (projectId) {
      items.push({
        label: projectName,
        icon: FolderOpen,
        path: `/project/${projectId}`,
        isCurrent: location.pathname === `/project/${projectId}`
      });

      // Add notebook if we're in notebook context
      if (location.pathname.includes("/notebook")) {
        items.push({
          label: notebookName,
          icon: BookOpen,
          path: `/project/${projectId}/notebook/data-upload`,
          isCurrent: false
        });

        // Add specific analysis step if present
        if (stepInfo) {
          items.push({
            label: stepInfo.label,
            icon: stepInfo.icon,
            path: location.pathname,
            isCurrent: true
          });
        }
      }
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 flex items-center">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              {item.isCurrent ? (
                <BreadcrumbPage className="flex items-center gap-2 text-foreground font-medium">
                  <item.icon className="w-4 h-4" />
                  <span className="truncate max-w-[200px]" title={item.label}>
                    {item.label}
                  </span>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link 
                    to={item.path} 
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="truncate max-w-[200px]" title={item.label}>
                      {item.label}
                    </span>
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};

export default Header;