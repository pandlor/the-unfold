import Sidebar from "@/components/Sidebar";

const Analysis = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
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
          </div>
      </main>
    </div>
  );
};

export default Analysis;