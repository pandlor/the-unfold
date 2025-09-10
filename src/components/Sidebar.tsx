import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, BarChart3, FileText, Lightbulb, Activity, FileBarChart, LogOut, Zap, ArrowLeft, Home, BookOpen, ChevronDown, ChevronRight, FolderOpen } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
const Sidebar = () => {
  const location = useLocation();
  const { projectId } = useParams();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  
  // Mock projects data - in real app this would come from API/state
  const projects = [
    { id: "sample1", name: "Sample Project 1", updatedAt: "2 days ago" },
    { id: "sample2", name: "Sample Project 2", updatedAt: "1 week ago" },
    { id: "proj_1757530116846", name: "Customer Analysis", updatedAt: "3 hours ago" },
    { id: "proj_1757530116847", name: "Sales Dashboard", updatedAt: "Yesterday" }
  ];
  
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
  return <aside className="w-64 bg-background border-r border-dataminder-border flex flex-col">
      {/* User Profile */}
      <div className="p-4 border-b border-dataminder-border bg-[#e9eef2] rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-dataminder-primary rounded flex items-center justify-center">
            <span className="text-white text-sm font-medium">DM</span>
          </div>
          <div>
            <div className="font-medium text-foreground text-sm">DataMinder Project</div>
            <div className="text-xs text-muted-foreground">ID: PRJ-2024-001</div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="p-4 space-y-2 border-b border-dataminder-border">
        {/* All Projects Collapsible Section */}
        <Collapsible open={isProjectsOpen} onOpenChange={setIsProjectsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
              <div className="flex items-center">
                <FolderOpen className="w-3 h-3 mr-2" />
                All Projects
              </div>
              {isProjectsOpen ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-2">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs pl-6" asChild>
              <Link to="/">
                <Home className="w-3 h-3 mr-2" />
                Create New Project
              </Link>
            </Button>
            {projects.map((project) => (
              <Button 
                key={project.id} 
                variant="ghost" 
                size="sm" 
                className={`w-full justify-start text-xs pl-6 ${
                  projectId === project.id ? "bg-primary/10 text-primary" : ""
                }`} 
                asChild
              >
                <Link to={`/project/${project.id}`}>
                  <div className="flex flex-col items-start w-full">
                    <span className="font-medium truncate">{project.name}</span>
                    <span className="text-xs text-muted-foreground">{project.updatedAt}</span>
                  </div>
                </Link>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Notebook Navigation - only show when in notebook context */}
        {projectId && (
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs" asChild>
            <Link to={`/project/${projectId}/notebook`}>
              <BookOpen className="w-3 h-3 mr-2" />
              Current Notebook
            </Link>
          </Button>
        )}
      </div>

      {/* Navigation */}
      {projectId && (
        <nav className="flex-1 p-4 space-y-1 bg-[#e9eef2] rounded-lg">
          {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return <Button key={index} variant={isActive ? "secondary" : "ghost"} className={`w-full justify-start text-sm font-normal ${isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`} asChild>
                <Link to={item.path}>
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Link>
              </Button>;
        })}
          
          <div className="pt-2">
            
          </div>
        </nav>
      )}

      {/* Logout */}
      
    </aside>;
};
export default Sidebar;