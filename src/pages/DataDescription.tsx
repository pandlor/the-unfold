import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import AnalysisSidebar from "@/components/AnalysisSidebar";
import Header from "@/components/Header";
import { AnalysisStepSkeleton } from "@/components/skeletons/AnalysisSkeleton";
import { NoAnalysisState } from "@/components/empty-states/NoAnalysisState";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DataDescription = () => {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasData(false); // Simulate no processed data
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formData, setFormData] = useState({
    researchGroup: "",
    dataLocation: "",
    collectionPeriod: "",
    collectionMethod: "",
    studyObjective: ""
  });

  const questions = [
    {
      id: 1,
      title: "Description of the Research Group",
      shortTitle: "Research Group",
      description: "Provide a detailed description of the research group: who the participants are, their sample size, key demographic characteristics, or other essential information.",
      field: "researchGroup",
      component: "textarea"
    },
    {
      id: 2,
      title: "Where Was the Data Collected?",
      shortTitle: "Where",
      description: "Specify the location of data collection (e.g., geographical location or platform).",
      field: "dataLocation",
      component: "input"
    },
    {
      id: 3,
      title: "When Was the Data Collected?",
      shortTitle: "When",
      description: "Indicate the period during which data collection took place.",
      field: "collectionPeriod",
      component: "input"
    },
    {
      id: 4,
      title: "How Was the Data Collected?",
      shortTitle: "How",
      description: "Describe the methods used for data collection, such as online surveys, interviews, or observations.",
      field: "collectionMethod",
      component: "textarea"
    },
    {
      id: 5,
      title: "What Is the Objective of the Study?",
      shortTitle: "What",
      description: "Define the main goal of the study, such as analyzing consumer preferences or assessing service satisfaction.",
      field: "studyObjective",
      component: "textarea"
    }
  ];

  const currentQuestionData = questions[currentQuestion - 1];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const goToQuestion = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
  };

  const goNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <AnalysisSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">Data Description</h1>
            
            {/* Question Navigation */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {questions.map((question) => (
                <Button
                  key={question.id}
                  variant={currentQuestion === question.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToQuestion(question.id)}
                  className="min-w-fit whitespace-nowrap"
                >
                  {question.id}. {question.shortTitle}
                </Button>
              ))}
            </div>

            {/* Current Question */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Question {currentQuestion} of {questions.length}
                  </h2>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {currentQuestionData.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {currentQuestionData.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <Label htmlFor={currentQuestionData.field} className="text-sm font-medium">
                    Your Answer
                  </Label>
                  {currentQuestionData.component === "textarea" ? (
                    <Textarea
                      id={currentQuestionData.field}
                      value={formData[currentQuestionData.field as keyof typeof formData]}
                      onChange={(e) => handleInputChange(currentQuestionData.field, e.target.value)}
                      placeholder="Enter your detailed response here..."
                      className="min-h-[120px]"
                    />
                  ) : (
                    <Input
                      id={currentQuestionData.field}
                      value={formData[currentQuestionData.field as keyof typeof formData]}
                      onChange={(e) => handleInputChange(currentQuestionData.field, e.target.value)}
                      placeholder="Enter your response here..."
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={goPrevious}
                disabled={currentQuestion === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                {currentQuestion} of {questions.length}
              </div>

              <Button
                onClick={goNext}
                disabled={currentQuestion === questions.length}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Save Progress */}
            {currentQuestion === questions.length && (
              <div className="mt-6 text-center">
                <Button size="lg" className="w-full sm:w-auto">
                  Save Data Description
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DataDescription;