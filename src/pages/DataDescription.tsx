import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const DataDescription = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">Data Description</h1>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                Comprehensive statistical descriptions and summaries of your dataset variables.
              </p>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Dataset Overview</h3>
                  <p className="text-muted-foreground">Rows: 10,453 | Columns: 24 | Size: 2.3 MB</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Variable Types</h3>
                  <p className="text-muted-foreground">Numerical: 18 | Categorical: 6</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DataDescription;