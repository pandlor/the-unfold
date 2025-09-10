import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, BarChart3, FileText, Lightbulb, Activity, FileBarChart, LogOut, Zap } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
  const { projectId } = useParams();
  
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

      {/* Navigation */}
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

      {/* Logout */}
      
    </aside>;
};
export default Sidebar;