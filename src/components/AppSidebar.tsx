import { useState } from "react";
import { Upload, BarChart3, FileText, Lightbulb, Activity, FileBarChart, Home, BookOpen, ChevronDown, ChevronRight, FolderOpen } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { projectId } = useParams();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [openProjects, setOpenProjects] = useState<string[]>([projectId || ""]);
  const { projects } = useProjects();
  
  const currentProject = projects.find(p => p.id === projectId);
  const currentPath = location.pathname;
  
  const getCurrentNotebookStep = () => {
    const path = location.pathname;
    if (path.includes('hypotheses')) return 'Hypotheses';
    if (path.includes('analysis')) return 'Analysis';
    if (path.includes('report')) return 'Report';
    return 'Notebook';
  };

  const toggleProject = (projectIdToToggle: string) => {
    setOpenProjects(prev => 
      prev.includes(projectIdToToggle) 
        ? prev.filter(id => id !== projectIdToToggle) 
        : [...prev, projectIdToToggle]
    );
  };

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary border-l-2 border-primary" : "hover:bg-muted/50";

  // Check if we should show collapsed mode (when in notebook context)
  const isInNotebook = projectId && location.pathname.includes('/notebook');
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      {/* Trigger inside sidebar for fallback */}
      <div className="p-2">
        <SidebarTrigger className="ml-auto" />
      </div>

      <SidebarContent>
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>{!isCollapsed && "Quick Actions"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className={getNavCls({ isActive: isActive("/") })}>
                    <Home className="h-4 w-4" />
                    {!isCollapsed && <span>Project Hub</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {isInNotebook && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={`/project/${projectId}`} className={getNavCls({ isActive: isActive(`/project/${projectId}`) })}>
                      <FolderOpen className="h-4 w-4" />
                      {!isCollapsed && <span>Project Dashboard</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* All Projects Section - only show if not collapsed */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupContent>
              <Collapsible open={isProjectsOpen} onOpenChange={setIsProjectsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-between text-xs p-2">
                    <div className="flex items-center">
                      <FolderOpen className="w-3 h-3 mr-2" />
                      All Projects
                    </div>
                    {isProjectsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-2">
                  {projects.map(project => (
                    <div key={project.id} className="space-y-1">
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleProject(project.id)} 
                          className="flex-shrink-0 w-6 h-6 p-0 ml-6"
                        >
                          {openProjects.includes(project.id) ? 
                            <ChevronDown className="w-3 h-3" /> : 
                            <ChevronRight className="w-3 h-3" />
                          }
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`flex-1 justify-start text-xs px-2 py-2 h-auto ${
                            projectId === project.id ? "bg-primary/10 text-primary border-l-2 border-primary" : ""
                          }`} 
                          asChild
                        >
                          <Link to={`/project/${project.id}`}>
                            <div className="flex flex-col items-start w-full">
                              <span className="font-medium truncate">{project.name}</span>
                              <span className="text-xs text-muted-foreground">{project.updatedAt}</span>
                              {projectId === project.id && (
                                <span className="text-xs text-primary font-medium">• Active Project</span>
                              )}
                            </div>
                          </Link>
                        </Button>
                      </div>
                      
                      {/* Project Notebooks */}
                      {openProjects.includes(project.id) && (
                        <div className="ml-12 space-y-1">
                          {project.notebooks.map(notebook => (
                            <Button 
                              key={notebook.id} 
                              variant="ghost" 
                              size="sm" 
                              className={`w-full justify-start text-xs pl-4 ${
                                location.pathname.includes(`/project/${project.id}/notebook`) ? 
                                "bg-muted/50 text-primary" : ""
                              }`} 
                              asChild
                            >
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
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Current Context - only show when in project context and not collapsed */}
        {!isCollapsed && projectId && currentProject && (
          <SidebarGroup>
            <SidebarGroupLabel>Current Context</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-1 px-2">
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
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}