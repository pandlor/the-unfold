import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Plus, 
  Activity, 
  Settings, 
  BarChart3, 
  Clock,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Upload,
  Database,
  Trash2,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Check,
  FileSearch
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NotebookCard } from "@/components/NotebookCard";
import { NoNotebooksState } from "@/components/empty-states/NoNotebooksState";
import { Project, Notebook, useProjects } from "@/contexts/ProjectContext";
import { useProjectActivity } from "@/hooks/useProjectActivity";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ProjectTabsProps {
  project: Project;
  notebooks: Notebook[];
  projectId: string;
  onCreateNotebook: () => void;
  onDeleteNotebook: (notebookId: string, notebookName: string) => void;
  createNotebookSection: React.ReactNode;
}

export const ProjectTabs = ({ 
  project, 
  notebooks, 
  projectId, 
  onCreateNotebook, 
  onDeleteNotebook,
  createNotebookSection 
}: ProjectTabsProps) => {
  const { activities, addActivity } = useProjectActivity(projectId);
  const { addNotebook } = useProjects();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    researchGroup: '',
    dataLocation: '',
    dataCollectionTime: '',
    dataCollectionMethod: '',
    studyObjective: ''
  });

  const createNewNotebook = () => {
    const notebookNumber = notebooks.length + 1;
    const newNotebook = {
      id: `notebook_${Date.now()}`,
      name: `Analysis Notebook ${notebookNumber}`,
      updatedAt: "Just created"
    };
    
    addNotebook(projectId, newNotebook);
    addActivity("Notebook created", newNotebook.name);
    
    toast({
      title: "Notebook Created",
      description: `${newNotebook.name} has been created successfully!`
    });
    
    // Navigate directly to the notebook interface
    window.location.href = `/project/${projectId}/notebook`;
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const questions = [
    {
      id: 1,
      title: "Description of the Research Group",
      description: "Provide a detailed description of the research group: who the participants are, their sample size, key demographic characteristics, or other essential information.",
      field: "researchGroup"
    },
    {
      id: 2,
      title: "Where Was the Data Collected?",
      description: "Specify the location of data collection (e.g., geographical location or platform).",
      field: "dataLocation"
    },
    {
      id: 3,
      title: "When Was the Data Collected?",
      description: "Indicate the period during which data collection took place.",
      field: "dataCollectionTime"
    },
    {
      id: 4,
      title: "How Was the Data Collected?",
      description: "Describe the methods used for data collection, such as online surveys, interviews, or observations.",
      field: "dataCollectionMethod"
    },
    {
      id: 5,
      title: "What Is the Objective of the Study?",
      description: "Define the main goal of the study, such as analyzing consumer preferences or assessing service satisfaction.",
      field: "studyObjective"
    }
  ];

  const currentQuestion = questions[currentStep - 1];

  // Show default message if no activities exist
  const recentActivity = activities.length > 0 ? activities : [
    { action: "Project created", item: project.name, time: project.updatedAt }
  ];

  return (
    <div>
      {/* Workflow Section */}
      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="data" className="gap-2">
            <Upload className="w-4 h-4" />
            Data
          </TabsTrigger>
          <TabsTrigger value="description" className="gap-2">
            <FileText className="w-4 h-4" />
            Description
          </TabsTrigger>
          <TabsTrigger value="profiling" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Profiling
          </TabsTrigger>
          <TabsTrigger value="notebooks" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Hypotheses ({notebooks.length})
          </TabsTrigger>
        </TabsList>

      <TabsContent value="notebooks" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Project Hypotheses</h2>
            <p className="text-muted-foreground">
              Manage and organize your research hypotheses
            </p>
          </div>
          <Button onClick={createNewNotebook} className="gap-2">
            <Plus className="w-4 h-4" />
            New Hypothesis
          </Button>
        </div>

        {notebooks.length === 0 ? (
          <NoNotebooksState onCreateNotebook={createNewNotebook} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notebooks.map((notebook) => (
              <NotebookCard
                key={notebook.id}
                notebook={notebook}
                projectId={projectId}
                onDelete={onDeleteNotebook}
              />
            ))}
          </div>
        )}

        <div className="mt-8">
          {createNotebookSection}
        </div>
      </TabsContent>

      <TabsContent value="data" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Data Management</h2>
            <p className="text-muted-foreground">
              Manage datasets that will be available to all notebooks in this project
            </p>
          </div>
          <Button onClick={() => window.location.href = `/project/${projectId}/data-upload`} className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Data
          </Button>
        </div>

        {/* Data Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No data uploaded yet</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 MB</div>
              <p className="text-xs text-muted-foreground">Storage used</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Last Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Never</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Files List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Uploaded Datasets
            </CardTitle>
            <CardDescription>
              Files available to all notebooks in this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No datasets uploaded</h3>
              <p className="text-muted-foreground mb-4">
                Upload your first dataset to get started with analysis
              </p>
              <Button onClick={() => window.location.href = `/project/${projectId}/data-upload`} className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Dataset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Data Actions</CardTitle>
            <CardDescription>
              Quick actions for data management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col gap-2"
                onClick={() => window.location.href = `/project/${projectId}/data-upload`}
              >
                <Upload className="w-6 h-6" />
                <span>Upload Data</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col gap-2"
                disabled
              >
                <Eye className="w-6 h-6" />
                <span>Preview Data</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col gap-2"
                disabled
              >
                <Download className="w-6 h-6" />
                <span>Export Data</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col gap-2"
                onClick={() => window.location.href = `/project/${projectId}/data-profiling`}
              >
                <BarChart3 className="w-6 h-6" />
                <span>Data Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="profiling" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Data Profiling</h2>
            <p className="text-muted-foreground">
              Analyze the structure and quality of your data
            </p>
          </div>
          <Button 
            onClick={() => window.location.href = `/project/${projectId}/data-profiling`}
            className="gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Start Profiling
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Data Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Check for missing values, outliers, and data consistency
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileSearch className="w-4 h-4" />
                Schema Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Understand data types, distributions, and relationships
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Statistical Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate descriptive statistics and visualizations
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Profiling Results
            </CardTitle>
            <CardDescription>
              View comprehensive analysis of your datasets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No profiling results yet</h3>
              <p className="text-muted-foreground mb-4">
                Upload data and run profiling to see detailed analysis
              </p>
              <Button onClick={() => window.location.href = `/project/${projectId}/data-profiling`} className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Start Profiling
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="description" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Project Data Description</h2>
            <p className="text-muted-foreground">
              Describe your research data and methodology to provide context for analysis
            </p>
          </div>
          <Button 
            onClick={() => window.location.href = `/project/${projectId}/data-description`}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Edit Description
          </Button>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep} of 5</CardTitle>
            <CardDescription>Complete all sections to provide comprehensive data context</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-6">
              {questions.map((question, index) => (
                <div key={question.id} className="flex items-center">
                  <button
                    onClick={() => goToStep(question.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep === question.id
                        ? 'bg-primary text-primary-foreground'
                        : formData[question.field as keyof typeof formData]
                        ? 'bg-green-100 text-green-700 border-2 border-green-200'
                        : 'bg-muted text-muted-foreground border-2 border-border'
                    }`}
                  >
                    {formData[question.field as keyof typeof formData] ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      question.id
                    )}
                  </button>
                  {index < questions.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      currentStep > question.id ? 'bg-green-200' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Current Question */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-question" className="text-lg font-semibold">
                  {currentQuestion.title}
                </Label>
                <p className="text-muted-foreground mt-1 mb-4">
                  {currentQuestion.description}
                </p>
              </div>
              
              <Textarea
                id="current-question"
                placeholder="Enter your response..."
                value={formData[currentQuestion.field as keyof typeof formData]}
                onChange={(e) => updateFormData(currentQuestion.field, e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                {currentStep < 5 ? (
                  <Button onClick={nextStep} className="gap-2">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Description Saved",
                        description: "Your data description has been saved successfully."
                      });
                    }}
                    className="gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Description
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Quick view of all responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${
                      formData[question.field as keyof typeof formData] 
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                    }`} />
                    <Label className="text-sm font-medium">{question.title}</Label>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    {formData[question.field as keyof typeof formData] 
                      ? `${formData[question.field as keyof typeof formData].substring(0, 50)}${formData[question.field as keyof typeof formData].length > 50 ? '...' : ''}`
                      : 'Not completed'
                    }
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      </Tabs>
    </div>
  );
};