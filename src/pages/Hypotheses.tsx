import Sidebar from "@/components/Sidebar";

const Hypotheses = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">Hypotheses</h1>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                Generate and test statistical hypotheses based on your data patterns and relationships.
              </p>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2">Hypothesis 1</h3>
                  <p className="text-muted-foreground">Variable A is positively correlated with Variable B</p>
                  <span className="text-sm text-primary font-medium">Status: Under Investigation</span>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-green-500">
                  <h3 className="font-semibold text-foreground mb-2">Hypothesis 2</h3>
                  <p className="text-muted-foreground">Group differences exist in the target variable</p>
                  <span className="text-sm text-green-600 font-medium">Status: Confirmed</span>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default Hypotheses;