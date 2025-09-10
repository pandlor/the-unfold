import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Report = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Report;