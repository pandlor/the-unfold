import { Button } from "@/components/ui/button";
import { ChevronRight, Home, FolderOpen, BookOpen } from "lucide-react";
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

  // Determine breadcrumb based on current path
  const getBreadcrumb = () => {
    if (location.pathname === "/") {
      return [{ label: "Projects", icon: Home, path: "/" }];
    }
    
    if (location.pathname === `/project/${projectId}`) {
      return [
        { label: "Projects", icon: Home, path: "/" },
        { label: projectName, icon: FolderOpen, path: `/project/${projectId}` }
      ];
    }
    
    if (location.pathname.includes("/notebook")) {
      return [
        { label: "Projects", icon: Home, path: "/" },
        { label: projectName, icon: FolderOpen, path: `/project/${projectId}` },
        { label: notebookName, icon: BookOpen, path: `/project/${projectId}/notebook` }
      ];
    }
    
    return [{ label: "Projects", icon: Home, path: "/" }];
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 flex items-center">
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        {breadcrumb.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
            <Button variant="ghost" size="sm" className="h-auto p-1" asChild>
              <Link to={item.path} className="flex items-center">
                <item.icon className="w-4 h-4 mr-1" />
                {item.label}
              </Link>
            </Button>
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Header;