import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, BarChart3, FileText, Lightbulb, Activity, FileBarChart, LogOut, Zap, ArrowLeft, Home, BookOpen, ChevronDown, ChevronRight, FolderOpen } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { useProjects } from "@/contexts/ProjectContext";

const Sidebar = () => {
  const location = useLocation();
  const { projectId } = useParams();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [openProjects, setOpenProjects] = useState<string[]>([projectId || ""]);
  const { projects } = useProjects();
  
  const currentProject = projects.find(p => p.id === projectId);
  const getCurrentNotebookStep = () => {
    const path = location.pathname;
    if (path.includes('data-upload')) return 'Data Upload';
    if (path.includes('data-profiling')) return 'Data Profiling';
    if (path.includes('data-description')) return 'Data Description';
    if (path.includes('hypotheses')) return 'Hypotheses';
    if (path.includes('analysis')) return 'Analysis';
    if (path.includes('report')) return 'Report';
    return 'Notebook';
  };

  const toggleProject = (projectIdToToggle: string) => {
    setOpenProjects(prev => prev.includes(projectIdToToggle) ? prev.filter(id => id !== projectIdToToggle) : [...prev, projectIdToToggle]);
  };
  const navigationItems = [{
    icon: Upload,
    label: "data upload",
    path: `/project/${projectId}/notebook/data-upload`
  }, {
    icon: BarChart3,
    label: "data profiling",
    path: `/project/${projectId}/notebook/data-profiling`
  }, {
    icon: FileText,
    label: "data description",
    path: `/project/${projectId}/notebook/data-description`
  }, {
    icon: Lightbulb,
    label: "hypotheses",
    path: `/project/${projectId}/notebook/hypotheses`
  }, {
    icon: Activity,
    label: "analysis",
    path: `/project/${projectId}/notebook/analysis`
  }, {
    icon: FileBarChart,
    label: "report",
    path: `/project/${projectId}/notebook/report`
  }];
  // Check if we should show collapsed mode (when in notebook context)
  const isInNotebook = projectId && location.pathname.includes('/notebook');
  
  if (isInNotebook) {
    return (
      <aside className="w-12 bg-background border-r border-border flex flex-col items-center py-4">
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0" asChild>
          <Link to="/">
            <Home className="w-4 h-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 mt-2" asChild>
          <Link to={`/project/${projectId}`}>
            <FolderOpen className="w-4 h-4" />
          </Link>
        </Button>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-background border-r border-border flex flex-col">
      {/* Quick Navigation */}
      <div className="p-4 space-y-2 border-b border-border">
        {/* All Projects Collapsible Section */}
        <Collapsible open={isProjectsOpen} onOpenChange={setIsProjectsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
              <div className="flex items-center">
                <FolderOpen className="w-3 h-3 mr-2" />
                All Projects
              </div>
              {isProjectsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-2">
            <Button variant="ghost" size="sm" className={`w-full justify-start text-xs pl-6 ${location.pathname === "/" ? "bg-primary/10 text-primary border-l-2 border-primary" : ""}`} asChild>
              <Link to="/">
                <Home className="w-3 h-3 mr-2" />
                Project Hub
              </Link>
            </Button>
            {projects.map(project => (
              <div key={project.id} className="space-y-1">
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" onClick={() => toggleProject(project.id)} className="flex-shrink-0 w-6 h-6 p-0 ml-6">
                    {openProjects.includes(project.id) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  </Button>
                  <Button variant="ghost" size="sm" className={`flex-1 justify-start text-xs px-2 py-2 h-auto ${projectId === project.id ? "bg-primary/10 text-primary border-l-2 border-primary" : ""}`} asChild>
                    <Link to={`/project/${project.id}`}>
                      <div className="flex flex-col items-start w-full">
                        <span className="font-medium truncate">{project.name}</span>
                        <span className="text-xs text-muted-foreground">{project.updatedAt}</span>
                        {projectId === project.id && <span className="text-xs text-primary font-medium">• Active Project</span>}
                      </div>
                    </Link>
                  </Button>
                </div>
                
                {/* Project Notebooks */}
                {openProjects.includes(project.id) && (
                  <div className="ml-12 space-y-1">
                    {project.notebooks.map(notebook => (
                      <Button key={notebook.id} variant="ghost" size="sm" className={`w-full justify-start text-xs pl-4 ${location.pathname.includes(`/project/${project.id}/notebook`) ? "bg-muted/50 text-primary" : ""}`} asChild>
                        <Link to={`/project/${project.id}/notebook`}>
                          <BookOpen className="w-3 h-3 mr-2" />
                          <div className="flex flex-col items-start w-full">
                            <span className="truncate">{notebook.name}</span>
                            <span className="text-xs text-muted-foreground">{notebook.updatedAt}</span>
                          </div>
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Current Context - only show when in project context */}
        {projectId && currentProject && (
          <div className="space-y-1">
            <div className="px-2 py-1 bg-muted/50 rounded-md">
              <div className="text-xs text-muted-foreground">Current Project:</div>
              <div className="text-xs font-medium text-primary truncate">{currentProject.name}</div>
            </div>
            {location.pathname.includes('/notebook') && (
              <div className="px-2 py-1 bg-primary/10 rounded-md">
                <div className="text-xs text-muted-foreground">Current Step:</div>
                <div className="text-xs font-medium text-primary">{getCurrentNotebookStep()}</div>
              </div>
            )}
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs" asChild>
              <Link to={`/project/${projectId}/notebook`}>
                <BookOpen className="w-3 h-3 mr-2" />
                Go to Notebook
              </Link>
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;