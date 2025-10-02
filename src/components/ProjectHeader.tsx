import { ArrowLeft, FolderOpen, Calendar, FileText, Edit2, Check, X, TrendingUp, Users, MapPin, Clock, ChevronDown, ChevronUp, Settings, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Project, useProjects } from "@/contexts/ProjectContext";
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ProgressCircle } from "@/components/project-header/ProgressCircle";
import { ManagementTabs } from "@/components/project-header/ManagementTabs";
import { MetricsCards } from "@/components/project-header/MetricsCards";
interface ProjectHeaderProps {
  project: Project;
  showBackButton?: boolean;
  activeManagementTab?: string;
  onManagementTabChange?: (tab: string) => void;
}
export const ProjectHeader = ({
  project,
  showBackButton = true,
  activeManagementTab = "overview",
  onManagementTabChange
}: ProjectHeaderProps) => {
  const navigate = useNavigate();
  const {
    updateProject,
    calculateProjectProgress
  } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  useEffect(() => {
    setEditName(project.name);
  }, [project.name]);
  const handleSave = () => {
    if (editName.trim() && editName !== project.name) {
      updateProject(project.id, {
        name: editName.trim()
      });
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
  const progress = calculateProjectProgress(project.id);

  return (
    <div className="border-b border-border bg-gradient-to-br from-background to-muted/20">
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Top Bar - Project Info & Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="hover:bg-muted -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}

            <div className="h-8 w-px bg-border flex-shrink-0" />

            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
              <FolderOpen className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="text-xl md:text-2xl font-bold h-auto py-1 px-2 border-primary/50 focus:border-primary"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="h-8 w-8 p-0 flex-shrink-0"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCancel}
                      className="h-8 w-8 p-0 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 group">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground truncate">
                      {project.name}
                    </h1>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Updated {project.updatedAt}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>
                    {project.notebooks.length} notebook
                    {project.notebooks.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {progress >= 100
                    ? "Complete"
                    : progress > 0
                    ? "In Progress"
                    : "Not Started"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start">
          {/* Left: Progress Circle */}
          <div className="lg:col-span-4">
            <ProgressCircle
              progress={progress}
              uploadedDatasets={project.progress?.uploadedDatasets.length || 0}
              profilingCompleted={project.progress?.profilingCompleted || false}
              hypothesesCount={project.progress?.hypothesesCount || 0}
              analysisCompleted={project.progress?.analysisCompleted || false}
            />
          </div>

          {/* Right: Metrics Cards */}
          <div className="lg:col-span-8">
            <MetricsCards
              datasetsCount={project.progress?.uploadedDatasets.length || 0}
              profilingCompleted={project.progress?.profilingCompleted || false}
              hypothesesCount={project.progress?.hypothesesCount || 0}
            />
          </div>
        </div>
        
        {/* Project Overview - Improved Collapsible Section */}
        <Collapsible open={isOverviewOpen} onOpenChange={setIsOverviewOpen} className="mt-8">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between p-4 h-auto hover:bg-muted/50 rounded-xl border-2 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-semibold block">Project Details</span>
                  <span className="text-xs text-muted-foreground">View description, research group & goals</span>
                </div>
              </div>
              {isOverviewOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="animate-accordion-down">
            <Card className="mt-3 bg-gradient-to-br from-muted/30 to-muted/10 border-border/50 shadow-sm">
              <CardContent className="p-6 space-y-6" key={`project-details-${project.id}-${project.updatedAt}`}>
                {project.dataDescription ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Who - Research Group */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <label className="text-sm font-semibold text-foreground">
                    Who? <span className="text-xs text-muted-foreground font-normal">Research Group</span>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.dataDescription?.researchGroup || "Not specified"}
                </p>
              </div>
                    
              {/* Where - Data Location */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <label className="text-sm font-semibold text-foreground">
                    Where? <span className="text-xs text-muted-foreground font-normal">Data Location</span>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.dataDescription?.dataLocation || "Not specified"}
                </p>
              </div>

              {/* When - Collection Time */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <label className="text-sm font-semibold text-foreground">
                    When? <span className="text-xs text-muted-foreground font-normal">Collection Time</span>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.dataDescription?.dataCollectionTime || "Not specified"}
                </p>
              </div>

              {/* How - Collection Method */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-orange-600" />
                  </div>
                  <label className="text-sm font-semibold text-foreground">
                    How? <span className="text-xs text-muted-foreground font-normal">Collection Method</span>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.dataDescription?.dataCollectionMethod || "Not specified"}
                </p>
              </div>

              {/* Why - Study Objective */}
              <div className="md:col-span-2 lg:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <label className="text-sm font-semibold text-foreground">
                    Why? <span className="text-xs text-muted-foreground font-normal">Study Objective</span>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.dataDescription?.studyObjective || "Not specified"}
                </p>
              </div>
                   </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground mb-1">No Data Description Yet</p>
                    <p className="text-xs text-muted-foreground">
                      Fill out the Description section in the dashboard to see details here
                    </p>
                  </div>
                )}
                
                {/* Management Tabs */}
                <ManagementTabs
                  activeTab={activeManagementTab}
                  onTabChange={onManagementTabChange}
                />
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};