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
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        {/* Quick Actions */}
        <SidebarGroup className="pt-4">
          <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
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
          <SidebarGroup className="px-2">
            <SidebarGroupContent>
              <Collapsible open={isProjectsOpen} onOpenChange={setIsProjectsOpen}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-between text-xs px-3 py-2 hover:bg-sidebar-accent font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4" />
                      <span>All Projects</span>
                    </div>
                    {isProjectsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {projects.map(project => (
                    <div key={project.id} className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleProject(project.id)} 
                          className="flex-shrink-0 w-6 h-6 p-0 hover:bg-sidebar-accent"
                        >
                          {openProjects.includes(project.id) ? 
                            <ChevronDown className="w-3 h-3" /> : 
                            <ChevronRight className="w-3 h-3" />
                          }
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`flex-1 justify-start text-xs px-2 py-2 h-auto hover:bg-sidebar-accent ${
                            projectId === project.id ? "bg-primary/10 text-primary border-l-2 border-primary" : ""
                          }`} 
                          asChild
                        >
                          <Link to={`/project/${project.id}`}>
                            <div className="flex flex-col items-start w-full gap-0.5">
                              <span className="font-medium truncate">{project.name}</span>
                              <span className="text-[10px] text-muted-foreground">{project.updatedAt}</span>
                            </div>
                          </Link>
                        </Button>
                      </div>
                      
                      {/* Project Notebooks */}
                      {openProjects.includes(project.id) && project.notebooks.length > 0 && (
                        <div className="ml-7 space-y-0.5 pl-3 border-l border-sidebar-border">
                          {project.notebooks.map(notebook => (
                            <Button 
                              key={notebook.id} 
                              variant="ghost" 
                              size="sm" 
                              className={`w-full justify-start text-xs px-2 py-1.5 h-auto hover:bg-sidebar-accent ${
                                location.pathname.includes(`/project/${project.id}/notebook`) ? 
                                "bg-muted/50 text-primary" : ""
                              }`} 
                              asChild
                            >
                              <Link to={`/project/${project.id}/notebook`}>
                                <BookOpen className="w-3 h-3 mr-2 flex-shrink-0" />
                                <div className="flex flex-col items-start w-full">
                                  <span className="truncate">{notebook.name}</span>
                                  <span className="text-[10px] text-muted-foreground">{notebook.updatedAt}</span>
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
          <SidebarGroup className="mt-auto px-2 pb-4">
            <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Current Context
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-2">
                <div className="px-3 py-2 bg-muted/30 rounded-lg border border-border/50">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Project</div>
                  <div className="text-xs font-medium text-foreground truncate">{currentProject.name}</div>
                </div>
                {location.pathname.includes('/notebook') && (
                  <div className="px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Current Step</div>
                    <div className="text-xs font-medium text-primary">{getCurrentNotebookStep()}</div>
                  </div>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}