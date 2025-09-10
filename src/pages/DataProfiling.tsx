import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import AnalysisSidebar from "@/components/AnalysisSidebar";
import Header from "@/components/Header";
import { AnalysisStepSkeleton, DataTableSkeleton } from "@/components/skeletons/AnalysisSkeleton";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { NoAnalysisState } from "@/components/empty-states/NoAnalysisState";
import { useParams } from "react-router-dom";

const DataProfiling = () => {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Simulate checking if data exists
      setHasData(false); // Set to true if files were uploaded
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleStartProfiling = async () => {
    setIsProcessing(true);
    // Simulate data processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setHasData(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <AnalysisSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <AnalysisStepSkeleton />
            ) : !hasData && !isProcessing ? (
              <NoAnalysisState 
                title="No Data to Profile"
                description="Upload your data files first to begin profiling and analysis."
                currentStep="data-upload"
                projectId={projectId}
                nextStepLabel="Upload Data"
              />
            ) : (
              <>
                <h1 className="text-3xl font-bold text-foreground mb-6">Data Profiling</h1>
                
                {isProcessing ? (
                  <div className="space-y-6">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <LoadingSpinner size="lg" text="Analyzing your data..." />
                    </div>
                    <DataTableSkeleton />
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-muted-foreground mb-4">
                      Analyze the structure and quality of your uploaded data.
                    </p>
                    <button 
                      onClick={handleStartProfiling}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
                    >
                      Start Profiling
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DataProfiling;