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
  
  // Circular progress bar calculations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return <div className="border-b border-border bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm">
      <div className="p-8">
        {/* Top Bar - Project Info & Status */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1">
            {showBackButton && <Button variant="ghost" onClick={() => navigate("/")} className="hover:bg-muted/50 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>}
            
            <div className="h-8 w-px bg-border" />
            
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl flex-shrink-0 shadow-sm">
              <FolderOpen className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {isEditing ? <div className="flex items-center gap-2">
                    <Input value={editName} onChange={e => setEditName(e.target.value)} onKeyDown={handleKeyPress} className="text-2xl font-bold h-auto py-1 px-2 border-primary/50 focus:border-primary" autoFocus />
                    <Button size="sm" onClick={handleSave} className="h-8 w-8 p-0 flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 w-8 p-0 flex-shrink-0">
                      <X className="w-4 h-4" />
                    </Button>
                  </div> : <div className="flex items-center gap-2 group">
                    <h1 className="text-3xl font-bold text-foreground truncate tracking-tight">{project.name}</h1>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>}
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Updated {project.updatedAt}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{project.notebooks.length} notebook{project.notebooks.length !== 1 ? 's' : ''}</span>
                </div>
                <Badge variant="secondary" className="ml-2">
                  {progress >= 100 ? "Complete" : progress > 0 ? "In Progress" : "Not Started"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Single Row Layout */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left: Enhanced Circular Progress - Hero Element */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Overall Progress
                  </h3>
                  <p className="text-xs text-muted-foreground/80 mb-4">
                    Project completion status
                  </p>
                  
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <svg className="transform -rotate-90 w-40 h-40">
                      {/* Background circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted/20"
                      />
                      {/* Progress circle with gradient */}
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="url(#progressGradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 70}
                        strokeDashoffset={2 * Math.PI * 70 - (progress / 100) * 2 * Math.PI * 70}
                        className="transition-all duration-700 ease-out"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" className="text-primary" stopColor="currentColor" />
                          <stop offset="100%" className="text-primary/60" stopColor="currentColor" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-foreground">{progress.toFixed(0)}%</span>
                      <span className="text-xs text-muted-foreground mt-1">complete</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-left">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Data Upload</span>
                      <span className={`font-medium ${project.progress?.uploadedDatasets.length ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {project.progress?.uploadedDatasets.length ? '✓' : '○'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Data Profiling</span>
                      <span className={`font-medium ${project.progress?.profilingCompleted ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {project.progress?.profilingCompleted ? '✓' : '○'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Hypotheses</span>
                      <span className={`font-medium ${project.progress?.hypothesesCount ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {project.progress?.hypothesesCount ? '✓' : '○'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Analysis</span>
                      <span className={`font-medium ${project.progress?.analysisCompleted ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {project.progress?.analysisCompleted ? '✓' : '○'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center: Management Navigation as Cohesive Tab Group */}
          <div className="col-span-12 lg:col-span-5">
            <Card className="bg-muted/30 border-border/50 shadow-sm h-full">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  Project Management
                </h3>
                
                <div className="space-y-3">
                  <Button 
                    variant={activeManagementTab === "overview" ? "default" : "ghost"} 
                    onClick={() => onManagementTabChange?.("overview")} 
                    className={`w-full justify-start gap-3 h-12 transition-all ${
                      activeManagementTab === "overview" 
                        ? "shadow-md" 
                        : "bg-background/50 text-muted-foreground hover:bg-background/80 hover:text-foreground"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      activeManagementTab === "overview" ? "bg-primary-foreground/20" : "bg-muted"
                    }`}>
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">Dashboard</div>
                      <div className={`text-xs ${activeManagementTab === "overview" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        Project overview & insights
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant={activeManagementTab === "activity" ? "default" : "ghost"} 
                    onClick={() => onManagementTabChange?.("activity")} 
                    className={`w-full justify-start gap-3 h-12 transition-all ${
                      activeManagementTab === "activity" 
                        ? "shadow-md" 
                        : "bg-background/50 text-muted-foreground hover:bg-background/80 hover:text-foreground"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      activeManagementTab === "activity" ? "bg-primary-foreground/20" : "bg-muted"
                    }`}>
                      <Activity className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">Activity</div>
                      <div className={`text-xs ${activeManagementTab === "activity" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        Recent actions & history
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant={activeManagementTab === "settings" ? "default" : "ghost"} 
                    onClick={() => onManagementTabChange?.("settings")} 
                    className={`w-full justify-start gap-3 h-12 transition-all ${
                      activeManagementTab === "settings" 
                        ? "shadow-md" 
                        : "bg-background/50 text-muted-foreground hover:bg-background/80 hover:text-foreground"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      activeManagementTab === "settings" ? "bg-primary-foreground/20" : "bg-muted"
                    }`}>
                      <Settings className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">Settings</div>
                      <div className={`text-xs ${activeManagementTab === "settings" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        Project configuration
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Key Metrics Dashboard - Compact & Consistent */}
          <div className="col-span-12 lg:col-span-4">
            <div className="space-y-2">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-md">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-blue-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground">Datasets</p>
                      <p className="text-xl font-bold text-blue-600">
                        {project.progress?.uploadedDatasets.length || 0}
                      </p>
                      <p className="text-[10px] text-muted-foreground">files uploaded</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/30 transition-all shadow-sm hover:shadow-md">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-green-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileSpreadsheet className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground">Data Profiling</p>
                      <p className={`text-base font-bold ${project.progress?.profilingCompleted ? "text-green-600" : "text-muted-foreground"}`}>
                        {project.progress?.profilingCompleted ? "Complete" : "Pending"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">analysis status</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 hover:border-purple-500/30 transition-all shadow-sm hover:shadow-md">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-purple-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground">Hypotheses</p>
                      <p className="text-xl font-bold text-purple-600">
                        {project.progress?.hypothesesCount || 0}
                      </p>
                      <p className="text-[10px] text-muted-foreground">created & tested</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <label className="text-sm font-semibold text-foreground">
                        Data Description
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description || "No data description provided yet"}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                      <label className="text-sm font-semibold text-foreground">
                        Research Group
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.researchGroup || "No research group specified"}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-primary" />
                      </div>
                      <label className="text-sm font-semibold text-foreground">
                        Goals
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.goals || "No goals defined yet"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>;
};