import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { BookOpen, Plus, Search, Activity, FileText, BarChart3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { useProjects } from "@/contexts/ProjectContext";
import { useProjectActivity } from "@/hooks/useProjectActivity";
import { ProjectHeader } from "@/components/ProjectHeader";
import { NotebookCard } from "@/components/NotebookCard";
import { NoNotebooksState } from "@/components/empty-states/NoNotebooksState";
import { NotebookListSkeleton } from "@/components/skeletons/NotebookSkeleton";
import { ProjectTabs } from "@/components/ProjectTabs";
const NotebookCreation = () => {
  const [notebookName, setNotebookName] = useState("");
  const [notebookDescription, setNotebookDescription] = useState("");
  const [activeManagementTab, setActiveManagementTab] = useState("overview");
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    notebookId: "",
    notebookName: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    projectId
  } = useParams();
  const {
    toast
  } = useToast();
  const { projects, addNotebook, deleteNotebook } = useProjects();
  const { addActivity } = useProjectActivity(projectId!);

  // Get notebooks for current project
  const currentProject = projects.find(p => p.id === projectId);
  const notebooks = currentProject?.notebooks || [];
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleCreateNotebook = async () => {
    if (!notebookName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a notebook name",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      // Simulate creation delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add new notebook using context
      const newNotebook = {
        id: `notebook_${Date.now()}`,
        name: notebookName,
        updatedAt: "Just created"
      };
      addNotebook(projectId!, newNotebook);
      
      // Log the activity
      addActivity("Notebook created", notebookName);
      
      toast({
        title: "Notebook Created",
        description: `${notebookName} has been created successfully!`
      });

      // Clear form
      setNotebookName("");
      setNotebookDescription("");

      // Navigate to the notebook interface
      navigate(`/project/${projectId}/notebook`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create notebook. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteNotebook = (notebookId: string, notebookName: string) => {
    setDeleteDialog({
      open: true,
      notebookId,
      notebookName
    });
  };
  const confirmDeleteNotebook = () => {
    const {
      notebookId
    } = deleteDialog;
    deleteNotebook(projectId!, notebookId);
    
    // Log the activity
    addActivity("Notebook deleted", deleteDialog.notebookName);
    
    toast({
      title: "Notebook Deleted",
      description: `${deleteDialog.notebookName} has been deleted successfully.`
    });
    setDeleteDialog({
      open: false,
      notebookId: "",
      notebookName: ""
    });
  };
  if (!currentProject) {
    return <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
              <p className="text-muted-foreground mt-2">The project you're looking for doesn't exist.</p>
              <Button onClick={() => navigate("/")} className="mt-4">
                Back to Projects
              </Button>
            </div>
          </main>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <ProjectHeader 
            project={currentProject} 
            activeManagementTab={activeManagementTab}
            onManagementTabChange={setActiveManagementTab}
          />
          
          <main className="flex-1 p-8 bg-slate-50">
            <div className="w-full max-w-6xl mx-auto">
              
              <ProjectTabs project={currentProject} notebooks={notebooks} projectId={projectId!} onCreateNotebook={scrollToForm} onDeleteNotebook={handleDeleteNotebook} createNotebookSection={<Card className="bg-card/80 backdrop-blur-sm border-border">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Create New Notebook</CardTitle>
                          <CardDescription>
                            Set up a new analysis environment for your data
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="notebook-name">Notebook Name *</Label>
                          <Input id="notebook-name" placeholder="e.g., Customer Analysis, Sales Report..." value={notebookName} onChange={e => setNotebookName(e.target.value)} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notebook-description">Description</Label>
                          <Textarea id="notebook-description" placeholder="Describe your analysis goals and objectives..." value={notebookDescription} onChange={e => setNotebookDescription(e.target.value)} rows={3} disabled={isLoading} />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => navigate("/")} disabled={isLoading}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateNotebook} disabled={isLoading || !notebookName.trim()} className="gap-2">
                          <Plus className="w-4 h-4" />
                          {isLoading ? "Creating..." : "Create Notebook"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>} />

              <DeleteConfirmDialog open={deleteDialog.open} onOpenChange={open => setDeleteDialog(prev => ({
              ...prev,
              open
            }))} onConfirm={confirmDeleteNotebook} title="Delete Notebook" description="Are you sure you want to delete" itemName={deleteDialog.notebookName} />
            </div>
          </main>
        </div>
      </div>
    </div>;
};
export default NotebookCreation;