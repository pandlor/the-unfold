import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { AnalysisStepSkeleton } from "@/components/skeletons/AnalysisSkeleton";
import { NoAnalysisState } from "@/components/empty-states/NoAnalysisState";
import { useParams } from "react-router-dom";

const Analysis = () => {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasHypotheses, setHasHypotheses] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasHypotheses(false); // Simulate no hypotheses defined
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <ProgressBar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <AnalysisStepSkeleton />
              ) : !hasHypotheses ? (
                <NoAnalysisState 
                  title="No Hypotheses Defined"
                  description="Define your research hypotheses before running analysis."
                  currentStep="hypotheses"
                  projectId={projectId}
                  nextStepLabel="Define Hypotheses"
                />
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-foreground mb-6">Analysis</h1>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-muted-foreground mb-4">
                      Perform advanced statistical analysis and machine learning on your datasets.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <h3 className="font-semibold text-foreground mb-2">Correlation Analysis</h3>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <h3 className="font-semibold text-foreground mb-2">Regression Model</h3>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <h3 className="font-semibold text-foreground mb-2">Clustering</h3>
                        <p className="text-sm text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
          </div>
        </main>
      </Layout>
    );
};

export default Analysis;