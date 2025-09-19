import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { AnalysisStepSkeleton } from "@/components/skeletons/AnalysisSkeleton";
import { NoAnalysisState } from "@/components/empty-states/NoAnalysisState";
import { useParams } from "react-router-dom";

const Report = () => {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnalysis, setHasAnalysis] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasAnalysis(false); // Simulate no analysis completed
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <ProgressBar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <AnalysisStepSkeleton />
              ) : !hasAnalysis ? (
                <NoAnalysisState 
                  title="No Analysis Results"
                  description="Complete the analysis step to generate comprehensive reports."
                  currentStep="analysis"
                  projectId={projectId}
                  nextStepLabel="Run Analysis"
                />
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-foreground mb-6">Report</h1>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-muted-foreground mb-4">
                      Generate comprehensive analysis reports with visualizations and insights.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h3 className="font-semibold text-foreground mb-2">Executive Summary</h3>
                        <p className="text-muted-foreground">
                          Analysis completed on dataset with key findings and recommendations.
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h3 className="font-semibold text-foreground mb-2">Key Insights</h3>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Strong correlation identified between variables X and Y</li>
                          <li>• Significant outliers detected in 3% of records</li>
                          <li>• Model accuracy achieved: 94.2%</li>
                        </ul>
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

export default Report;