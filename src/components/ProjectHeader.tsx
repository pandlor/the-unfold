import { ArrowLeft, FolderOpen, Calendar, FileText, Edit2, Check, X, BarChart3, Activity, Settings, TrendingUp, Database, FileSpreadsheet, Target, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Project, useProjects } from "@/contexts/ProjectContext";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ProjectHeaderProps {
  project: Project;
  showBackButton?: boolean;
  activeManagementTab?: string;
  onManagementTabChange?: (tab: string) => void;
}

export const ProjectHeader = ({ project, showBackButton = true, activeManagementTab = "overview", onManagementTabChange }: ProjectHeaderProps) => {
  const navigate = useNavigate();
  const { updateProject, calculateProjectProgress } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

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
        
        {/* Project Overview Card - Collapsible */}
        <Collapsible open={isOverviewOpen} onOpenChange={setIsOverviewOpen} className="mt-6">
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-3 h-auto bg-muted/20 hover:bg-muted/40 rounded-lg border border-border/50"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm text-muted-foreground">Project Progress</span>
                <Progress value={calculateProjectProgress(project.id)} className="flex-1 max-w-xs" />
                <span className="text-sm text-muted-foreground">{calculateProjectProgress(project.id)}%</span>
              </div>
              {isOverviewOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <Card className="mt-2 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Datasets</p>
                      <p className="text-xs text-muted-foreground">
                        {project.progress?.uploadedDatasets.length || 0} uploaded
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <FileSpreadsheet className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Data Profiling</p>
                      <p className="text-xs text-muted-foreground">
                        {project.progress?.profilingCompleted ? "Completed" : "Not started"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Hypotheses</p>
                      <p className="text-xs text-muted-foreground">
                        {project.progress?.hypothesesCount || 0} created
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Management Section */}
        <div className="mt-6 flex justify-center">
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