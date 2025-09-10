import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const DataProfiling = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-foreground mb-6">Data Profiling</h1>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  Analyze data quality, completeness, and structure patterns in your datasets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Data Quality Score</h3>
                    <p className="text-2xl font-bold text-primary">85%</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Missing Values</h3>
                    <p className="text-2xl font-bold text-destructive">12%</p>
                  </div>
                </div>
              </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default DataProfiling;