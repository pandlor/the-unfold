import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { AnalysisStepSkeleton, DataTableSkeleton } from "@/components/skeletons/AnalysisSkeleton";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { NoAnalysisState } from "@/components/empty-states/NoAnalysisState";
import { useParams } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";

const DataProfiling = () => {
  const { projectId } = useParams();
  const { projects, updateProjectProgress } = useProjects();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasData, setHasData] = useState(false);

  const project = projects.find(p => p.id === projectId);

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
    
    updateProjectProgress(projectId!, {
      profilingCompleted: true
    });
  };

  return (
    <Layout>
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <AnalysisStepSkeleton />
          ) : !hasData && !isProcessing ? (
              <NoAnalysisState 
                title="No Data to Profile"
                description={`Upload data files to ${project?.name} first to begin profiling and analysis.`}
                currentStep="data-upload"
                projectId={projectId}
                nextStepLabel="Upload Data"
              />
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Data Profiling</h1>
                  <p className="text-muted-foreground">
                    Analyze the structure and quality of data in <span className="font-medium">{project?.name}</span>
                  </p>
                </div>
                
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
    </Layout>
  );
};

export default DataProfiling;