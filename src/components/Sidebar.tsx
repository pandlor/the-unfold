import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  BarChart3, 
  FileText, 
  Lightbulb, 
  Activity, 
  FileBarChart, 
  LogOut,
  Zap
} from "lucide-react";

const Sidebar = () => {
  const navigationItems = [
    { icon: Zap, label: "Example project name", active: true },
    { icon: Upload, label: "data upload" },
    { icon: BarChart3, label: "data profiling" },
    { icon: FileText, label: "data description" },
    { icon: Lightbulb, label: "hypotheses" },
    { icon: Activity, label: "analysis" },
    { icon: FileBarChart, label: "report" },
  ];

  return (
    <aside className="w-64 bg-dataminder-secondary border-r border-dataminder-border flex flex-col">
      {/* User Profile */}
      <div className="p-4 border-b border-dataminder-border">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/lovable-uploads/e08a851c-41fb-4e7a-a429-1f8ccd1f671b.png" />
            <AvatarFallback className="bg-dataminder-primary text-white text-sm">A</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-foreground text-sm">Andželika</div>
            <div className="text-xs text-muted-foreground">user:tb46JG</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant={item.active ? "secondary" : "ghost"}
            className={`w-full justify-start text-sm font-normal ${
              item.active 
                ? "bg-primary/10 text-primary hover:bg-primary/15" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
        
        <div className="pt-2">
          <Button variant="ghost" className="w-full justify-start text-sm font-normal text-muted-foreground hover:text-foreground">
            <span className="w-4 h-4 mr-3 flex items-center justify-center text-xs">...</span>
            ...
          </Button>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-dataminder-border">
        <Button variant="ghost" className="w-full justify-start text-sm font-normal text-muted-foreground hover:text-foreground">
          <LogOut className="w-4 h-4 mr-3" />
          Log out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;