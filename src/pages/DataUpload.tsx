import Sidebar from "@/components/Sidebar";
import AnalysisSidebar from "@/components/AnalysisSidebar";
import Header from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { ProgressTracker } from "@/components/ProgressTracker";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DataUpload = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { toast } = useToast();

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    // Here you would typically process the files
  };

  const handleContinue = () => {
    navigate(`/project/${projectId}/notebook/data-profiling`);
    toast({
      title: "Ready for profiling",
      description: "Proceeding to data profiling step.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <AnalysisSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <ProgressTracker />
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Data Upload</h1>
                <p className="text-muted-foreground">
                  Upload your datasets to begin analysis. Supported formats include CSV, JSON, and Excel files.
                </p>
              </div>
            </div>
            
            <FileUpload onFileUpload={handleFileUpload} />
            
            <div className="flex justify-end mt-6">
              <Button onClick={handleContinue}>
                Continue to Profiling
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DataUpload;