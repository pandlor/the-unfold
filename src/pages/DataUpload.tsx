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
import { useState, useEffect } from "react";

const DataUpload = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { toast } = useToast();
  const { projects, updateProject } = useProjects();
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editProjectName, setEditProjectName] = useState('');
  
  const project = projects.find(p => p.id === projectId);
  // Use the currentNotebookId from project context, or fall back to the first notebook
  const notebook = project?.notebooks.find(n => n.id === project.currentNotebookId) || project?.notebooks[0];

  useEffect(() => {
    if (project) {
      setEditProjectName(project.name);
    }
  }, [project]);

  const handleSaveProject = () => {
    if (editProjectName.trim() && editProjectName !== project?.name && project) {
      updateProject(project.id, { name: editProjectName.trim() });
      toast({
        title: "Project updated",
        description: "Project name has been changed.",
      });
    }
    setIsEditingProject(false);
  };

  const handleCancelProject = () => {
    setEditProjectName(project?.name || '');
    setIsEditingProject(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveProject();
    } else if (e.key === 'Escape') {
      handleCancelProject();
    }
  };

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
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{notebook?.name || 'Notebook'}</h2>
                    {isEditingProject ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editProjectName}
                          onChange={(e) => setEditProjectName(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="text-sm h-auto py-1 px-2 border-primary/50 focus:border-primary"
                          autoFocus
                        />
                        <Button size="sm" onClick={handleSaveProject} className="h-6 w-6 p-0">
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancelProject} className="h-6 w-6 p-0">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <p className="text-sm text-muted-foreground">{project?.name}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setIsEditingProject(true)}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
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