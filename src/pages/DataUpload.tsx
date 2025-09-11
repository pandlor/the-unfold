import Sidebar from "@/components/Sidebar";
import AnalysisSidebar from "@/components/AnalysisSidebar";
import Header from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Edit2, Check, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/contexts/ProjectContext";
import { FileText } from "lucide-react";
import { useState } from "react";

const DataUpload = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { toast } = useToast();
  const { projects, updateProject } = useProjects();
  const [isEditingNotebook, setIsEditingNotebook] = useState(false);
  const [editNotebookName, setEditNotebookName] = useState("");
  
  const project = projects.find(p => p.id === projectId);
  // Use the currentNotebookId from project context, or fall back to the first notebook
  const notebook = project?.notebooks.find(n => n.id === project.currentNotebookId) || project?.notebooks[0];

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    // Here you would typically process the files
  };

  const handleContinue = () => {
    navigate(`/project/${projectId}/notebook/data-profiling`);
    toast({
      title: "Ready for profiling",
      description: "Proceeding to data profiling step.",
    });
  };

  const handleEditNotebook = () => {
    setEditNotebookName(notebook?.name || "");
    setIsEditingNotebook(true);
  };

  const handleSaveNotebook = () => {
    if (editNotebookName.trim() && notebook && project) {
      const updatedNotebooks = project.notebooks.map(n =>
        n.id === notebook.id ? { ...n, name: editNotebookName.trim() } : n
      );
      updateProject(project.id, { notebooks: updatedNotebooks });
      setIsEditingNotebook(false);
      toast({
        title: "Notebook renamed",
        description: "Notebook name has been updated.",
      });
    }
  };

  const handleCancelNotebook = () => {
    setEditNotebookName("");
    setIsEditingNotebook(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveNotebook();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancelNotebook();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <AnalysisSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 group">
                      {isEditingNotebook ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editNotebookName}
                            onChange={(e) => setEditNotebookName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="text-lg font-semibold h-8 px-2"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleSaveNotebook}
                            className="h-8 w-8 p-0"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelNotebook}
                            className="h-8 w-8 p-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h2 className="text-lg font-semibold text-foreground">{notebook?.name || 'Notebook'}</h2>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleEditNotebook}
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{project?.name}</p>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Data Upload</h1>
                <p className="text-muted-foreground">
                  Upload your datasets to begin analysis. Supported formats include CSV, JSON, and Excel files.
                </p>
              </div>
            </div>
            
            <FileUpload onFileUpload={handleFileUpload} />
            
            <div className="flex justify-end mt-6">
              <Button onClick={handleContinue}>
                Continue to Profiling
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DataUpload;