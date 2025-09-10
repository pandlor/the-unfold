import Sidebar from "@/components/Sidebar";

const DataUpload = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">Data Upload</h1>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                Upload your datasets to begin analysis. Supported formats include CSV, JSON, and Excel files.
              </p>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">Drag and drop files here or click to browse</p>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default DataUpload;