import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Save, FileText, Calendar, Globe, Users, Target, ChevronLeft, ChevronRight } from "lucide-react";

const DataDescription = () => {
  const { projectId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    researchGroup: '',
    dataLocation: '',
    dataCollectionTime: '',
    dataCollectionMethod: '',
    studyObjective: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
      field: "researchGroup",
      icon: Users
    },
    {
      id: 2,
      title: "Where Was the Data Collected?",
      description: "Specify the location of data collection (e.g., geographical location or platform).",
      field: "dataLocation",
      icon: Globe
    },
    {
      id: 3,
      title: "When Was the Data Collected?",
      description: "Indicate the period during which data collection took place.",
      field: "dataCollectionTime",
      icon: Calendar
    },
    {
      id: 4,
      title: "How Was the Data Collected?",
      description: "Describe the methods used for data collection, such as online surveys, interviews, or observations.",
      field: "dataCollectionMethod",
      icon: FileText
    },
    {
      id: 5,
      title: "What Is the Objective of the Study?",
      description: "Define the main goal of the study, such as analyzing consumer preferences or assessing service satisfaction.",
      field: "studyObjective",
      icon: Target
    }
  ];

  const currentQuestion = questions[currentStep - 1];
  const completedSteps = questions.filter(q => formData[q.field as keyof typeof formData]).length;
  const progressPercentage = (completedSteps / questions.length) * 100;

  const saveDataDescription = () => {
    // Data description saved successfully
    // Here you would typically save to your backend
  };

  if (isLoading) {
    return (
      <Layout>
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Data Description</h1>
              <p className="text-muted-foreground">
                Provide context and background information about your research data
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              Step {currentStep} of {questions.length}
            </Badge>
          </div>

          {/* Progress Overview */}
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Description Progress</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {completedSteps} of {questions.length} completed
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="mb-4" />
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => goToStep(question.id)}
                    className={`p-2 rounded-lg text-xs text-center transition-colors ${
                      currentStep === question.id
                        ? 'bg-primary text-primary-foreground'
                        : formData[question.field as keyof typeof formData]
                        ? 'bg-green-100 text-green-700 border-2 border-green-200'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <question.icon className="w-4 h-4 mx-auto mb-1" />
                    Step {index + 1}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Question */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <currentQuestion.icon className="w-6 h-6 text-primary" />
                {currentQuestion.title}
              </CardTitle>
              <CardDescription>
                {currentQuestion.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-response" className="text-base font-medium">
                  Your Response
                </Label>
                <Textarea
                  id="current-response"
                  placeholder="Enter your detailed response..."
                  value={formData[currentQuestion.field as keyof typeof formData]}
                  onChange={(e) => updateFormData(currentQuestion.field, e.target.value)}
                  className="min-h-[120px] mt-2"
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
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
                  {currentStep < questions.length ? (
                    <Button onClick={nextStep} className="gap-2">
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button onClick={saveDataDescription} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Data Description
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  );
};

export default DataDescription;