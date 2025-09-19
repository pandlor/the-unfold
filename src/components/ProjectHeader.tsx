import { ArrowLeft, FolderOpen, Calendar, FileText, Edit2, Check, X, BarChart3, Activity, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Project, useProjects } from "@/contexts/ProjectContext";
import { useState, useEffect } from "react";

interface ProjectHeaderProps {
  project: Project;
  showBackButton?: boolean;
  activeManagementTab?: string;
  onManagementTabChange?: (tab: string) => void;
}

export const ProjectHeader = ({ project, showBackButton = true, activeManagementTab = "overview", onManagementTabChange }: ProjectHeaderProps) => {
  const navigate = useNavigate();
  const { updateProject } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);

  useEffect(() => {
    setEditName(project.name);
  }, [project.name]);

  const handleSave = () => {
    if (editName.trim() && editName !== project.name) {
      updateProject(project.id, { name: editName.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(project.name);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="p-6">
        {showBackButton && (
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        )}
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <FolderOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="text-2xl font-bold h-auto py-1 px-2 border-primary/50 focus:border-primary"
                      autoFocus
                    />
                    <Button size="sm" onClick={handleSave} className="h-8 w-8 p-0">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 w-8 p-0">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 group">
                    <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Updated {project.updatedAt}
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {project.notebooks.length} notebook{project.notebooks.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
          
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Active Project
          </Badge>
        </div>
        
        {/* Management Section */}
        <div className="mt-6">
          <Tabs value={activeManagementTab} onValueChange={onManagementTabChange}>
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Activity className="w-4 h-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};