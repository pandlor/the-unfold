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
          
          <div className="flex items-start gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Active Project
            </Badge>
            
            {/* Management Buttons - Vertical Layout */}
            <div className="flex flex-col gap-2">
              <Button
                variant={activeManagementTab === "overview" ? "default" : "secondary"}
                size="sm"
                onClick={() => onManagementTabChange?.("overview")}
                className="justify-start gap-2 min-w-[120px] h-9"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </Button>
              <Button
                variant={activeManagementTab === "activity" ? "default" : "secondary"}
                size="sm"
                onClick={() => onManagementTabChange?.("activity")}
                className="justify-start gap-2 min-w-[120px] h-9"
              >
                <Activity className="w-4 h-4" />
                Activity
              </Button>
              <Button
                variant={activeManagementTab === "settings" ? "default" : "secondary"}
                size="sm"
                onClick={() => onManagementTabChange?.("settings")}
                className="justify-start gap-2 min-w-[120px] h-9"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
        
        {/* Project Overview Card - Collapsible */}
        <Collapsible open={isOverviewOpen} onOpenChange={setIsOverviewOpen} className="mt-6">
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-3 h-auto bg-muted/20 hover:bg-muted/40 rounded-lg border border-border/50"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Project Progress</span>
                
                {/* Circular Progress Ring */}
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted/30"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - calculateProjectProgress(project.id) / 100)}`}
                      className="text-primary transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Percentage text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground">
                      {calculateProjectProgress(project.id)}%
                    </span>
                  </div>
                </div>
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
                <div className="space-y-4">
                  {/* Description Fields */}
                  <div className="grid grid-cols-1 gap-3 p-4 bg-background/60 rounded-lg border border-border/50">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                        Data Description
                      </label>
                      <p className="text-sm text-foreground">
                        {project.description || "No data description provided yet"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                        Research Group
                      </label>
                      <p className="text-sm text-foreground">
                        {project.researchGroup || "No research group specified"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                        Goals
                      </label>
                      <p className="text-sm text-foreground">
                        {project.goals || "No goals defined yet"}
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
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
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};