import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Plus, Activity, Settings, BarChart3, Clock, FileText, TrendingUp, ArrowUpRight, Upload, Database, Trash2, Download, Eye, ChevronLeft, ChevronRight, Check, FileSearch } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NotebookCard } from "@/components/NotebookCard";
import { NoNotebooksState } from "@/components/empty-states/NoNotebooksState";
import { Project, Notebook, useProjects } from "@/contexts/ProjectContext";
import { useProjectActivity } from "@/hooks/useProjectActivity";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
interface ProjectTabsProps {
  project: Project;
  notebooks: Notebook[];
  projectId: string;
  onCreateNotebook: () => void;
  onDeleteNotebook: (notebookId: string, notebookName: string) => void;
  createNotebookSection: ReactNode;
}
export const ProjectTabs = ({
  project,
  notebooks,
  projectId,
  onCreateNotebook,
  onDeleteNotebook,
  createNotebookSection
}: ProjectTabsProps) => {
  const {
    activities,
    addActivity
  } = useProjectActivity(projectId);
  const {
    addNotebook,
    updateProject,
    updateProjectProgress
  } = useProjects();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    researchGroup: project.dataDescription?.researchGroup || '',
    dataLocation: project.dataDescription?.dataLocation || '',
    dataCollectionTime: project.dataDescription?.dataCollectionTime || '',
    dataCollectionMethod: project.dataDescription?.dataCollectionMethod || '',
    studyObjective: project.dataDescription?.studyObjective || ''
  });

  // Update form data when project data changes
  useEffect(() => {
    if (project.dataDescription) {
      setFormData({
        researchGroup: project.dataDescription.researchGroup || '',
        dataLocation: project.dataDescription.dataLocation || '',
        dataCollectionTime: project.dataDescription.dataCollectionTime || '',
        dataCollectionMethod: project.dataDescription.dataCollectionMethod || '',
        studyObjective: project.dataDescription.studyObjective || ''
      });
    }
  }, [project.dataDescription]);
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
    navigate(`/project/${projectId}/notebook`);
  };
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
  const questions = [{
    id: 1,
    title: "Description of the Research Group",
    description: "Provide a detailed description of the research group: who the participants are, their sample size, key demographic characteristics, or other essential information.",
    field: "researchGroup"
  }, {
    id: 2,
    title: "Where Was the Data Collected?",
    description: "Specify the location of data collection (e.g., geographical location or platform).",
    field: "dataLocation"
  }, {
    id: 3,
    title: "When Was the Data Collected?",
    description: "Indicate the period during which data collection took place.",
    field: "dataCollectionTime"
  }, {
    id: 4,
    title: "How Was the Data Collected?",
    description: "Describe the methods used for data collection, such as online surveys, interviews, or observations.",
    field: "dataCollectionMethod"
  }, {
    id: 5,
    title: "What Is the Objective of the Study?",
    description: "Define the main goal of the study, such as analyzing consumer preferences or assessing service satisfaction.",
    field: "studyObjective"
  }];
  const currentQuestion = questions[currentStep - 1];

  // Show default message if no activities exist
  const recentActivity = activities.length > 0 ? activities : [{
    action: "Project created",
    item: project.name,
    time: project.updatedAt
  }];
  return <div>
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

        {notebooks.length === 0 ? <NoNotebooksState onCreateNotebook={createNewNotebook} /> : <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notebooks.map(notebook => <NotebookCard key={notebook.id} notebook={notebook} projectId={projectId} onDelete={onDeleteNotebook} />)}
          </div>}

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
          <Button onClick={() => navigate(`/project/${projectId}/data-upload`)} className="gap-2">
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
              <Button onClick={() => navigate(`/project/${projectId}/data-upload`)} className="gap-2">
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
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" onClick={() => navigate(`/project/${projectId}/data-upload`)}>
                <Upload className="w-6 h-6" />
                <span>Upload Data</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" disabled>
                <Eye className="w-6 h-6" />
                <span>Preview Data</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" disabled>
                <Download className="w-6 h-6" />
                <span>Export Data</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" onClick={() => navigate(`/project/${projectId}/data-profiling`)}>
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
          <Button onClick={() => navigate(`/project/${projectId}/data-profiling`)} className="gap-2">
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
              <Button onClick={() => navigate(`/project/${projectId}/data-profiling`)} className="gap-2">
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
          <Button onClick={() => navigate(`/project/${projectId}/data-description`)} className="gap-2">
            <FileText className="w-4 h-4" />
            Edit Description
          </Button>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          
        </Card>

        {/* Step Navigation Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Data Description Framework</CardTitle>
            <CardDescription>Answer the 5W questions to provide comprehensive context for your research data</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step Selector Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {questions.map((question, index) => {
                const labels = ['Who?', 'Where?', 'When?', 'How?', 'Why?'];
                const isActive = currentStep === question.id;
                const isCompleted = formData[question.field as keyof typeof formData];
                return <button key={question.id} onClick={() => goToStep(question.id)} className={`group relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${isActive ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : isCompleted ? 'border-green-200 bg-green-50 hover:border-green-300 hover:shadow-md' : 'border-border bg-background hover:border-primary/30 hover:shadow-md'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${isActive ? 'bg-primary text-primary-foreground' : isCompleted ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                        {isCompleted ? <Check className="w-4 h-4" /> : question.id}
                      </div>
                      {isActive && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold mb-1 ${isActive ? 'text-primary' : isCompleted ? 'text-green-700' : 'text-foreground'}`}>
                        {labels[index]}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {question.title.replace(/^(Description of the Research Group|Where Was the Data Collected\?|When Was the Data Collected\?|How Was the Data Collected\?|What Is the Objective of the Study\?)/, '').trim() || question.title}
                      </p>
                    </div>
                  </button>;
              })}
            </div>

            {/* Current Question Form */}
            <div className="bg-muted/30 rounded-xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-lg font-bold text-primary-foreground">{currentStep}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {currentQuestion.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentQuestion.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="current-question" className="text-sm font-medium">
                  Your Response
                </Label>
                <Textarea id="current-question" placeholder="Type your answer here..." value={formData[currentQuestion.field as keyof typeof formData]} onChange={e => updateFormData(currentQuestion.field, e.target.value)} className="min-h-[140px] resize-none" />
                <p className="text-xs text-muted-foreground">
                  {formData[currentQuestion.field as keyof typeof formData]?.length || 0} characters
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                {currentStep < 5 ? <Button onClick={nextStep} className="gap-2">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button> : <Button onClick={() => {
                  updateProject(projectId, {
                    dataDescription: formData,
                    updatedAt: new Date().toLocaleString()
                  });
                  updateProjectProgress(projectId, {
                    descriptionCompleted: true
                  });
                  toast({
                    title: "Description Saved",
                    description: "Your data description has been saved successfully."
                  });
                }} className="gap-2">
                    <Check className="w-4 h-4" />
                    Save Description
                  </Button>}
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
              {questions.map(question => <div key={question.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${formData[question.field as keyof typeof formData] ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <Label className="text-sm font-medium">{question.title}</Label>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    {formData[question.field as keyof typeof formData] ? `${formData[question.field as keyof typeof formData].substring(0, 50)}${formData[question.field as keyof typeof formData].length > 50 ? '...' : ''}` : 'Not completed'}
                  </p>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      </Tabs>
    </div>;
};