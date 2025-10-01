import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { Lightbulb, Plus, Activity, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
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
  const [editedProjectName, setEditedProjectName] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    notebookId: "",
    notebookName: ""
  });
  const [projectDeleteDialog, setProjectDeleteDialog] = useState({
    open: false,
    projectId: "",
    projectName: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    projectId
  } = useParams();
  const {
    toast
  } = useToast();
  const {
    projects,
    addNotebook,
    deleteNotebook,
    updateProject,
    deleteProject
  } = useProjects();
  const {
    addActivity
  } = useProjectActivity(projectId!);

  // Get notebooks for current project
  const currentProject = projects.find(p => p.id === projectId);
  const notebooks = currentProject?.notebooks || [];

  // Get real project activities
  const {
    activities
  } = useProjectActivity(projectId!);

  // Initialize edited project name when project loads
  React.useEffect(() => {
    if (currentProject) {
      setEditedProjectName(currentProject.name);
    }
  }, [currentProject]);
  const handleCreateNotebook = async () => {
    if (!notebookName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a hypothesis title",
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
      addActivity("Hypothesis created", notebookName);
      toast({
        title: "Hypothesis Created",
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
  const handleProjectNameChange = () => {
    if (!editedProjectName.trim()) {
      toast({
        title: "Error",
        description: "Project name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    updateProject(projectId!, {
      name: editedProjectName.trim()
    });
    addActivity("Project renamed", editedProjectName.trim());
    toast({
      title: "Project Updated",
      description: "Project name has been updated successfully!"
    });
  };
  const handleDeleteProject = () => {
    setProjectDeleteDialog({
      open: true,
      projectId: projectId!,
      projectName: currentProject?.name || ""
    });
  };
  const confirmDeleteProject = () => {
    deleteProject(projectId!);
    toast({
      title: "Project Deleted",
      description: `${projectDeleteDialog.projectName} has been deleted successfully.`
    });
    setProjectDeleteDialog({
      open: false,
      projectId: "",
      projectName: ""
    });
    navigate("/");
  };
  if (!currentProject) {
    return <Layout>
        <main className="flex-1 p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
            <p className="text-muted-foreground mt-2">The project you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Back to Projects
            </Button>
          </div>
        </main>
      </Layout>;
  }
  return <Layout>
      <ProjectHeader project={currentProject} activeManagementTab={activeManagementTab} onManagementTabChange={setActiveManagementTab} />
          
          <main className="flex-1 p-8 bg-slate-50/0">
            <div className="w-full max-w-6xl mx-auto">
              
              {/* Content based on active management tab */}
              {activeManagementTab === "overview" && <ProjectTabs project={currentProject} notebooks={notebooks} projectId={projectId!} onCreateNotebook={() => {}} onDeleteNotebook={handleDeleteNotebook} createNotebookSection={<Card className="bg-card/80 backdrop-blur-sm border-border">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                            <Lightbulb className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">Create New Hypothesis</CardTitle>
                            <CardDescription>
                              Formulate a testable research question for your data analysis
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="notebook-name">Hypothesis Title *</Label>
                            <Input id="notebook-name" placeholder="e.g., Customer satisfaction affects retention..." value={notebookName} onChange={e => setNotebookName(e.target.value)} disabled={isLoading} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notebook-description">Research Question</Label>
                            <Textarea id="notebook-description" placeholder="Define your testable hypothesis and expected outcomes..." value={notebookDescription} onChange={e => setNotebookDescription(e.target.value)} rows={3} disabled={isLoading} />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3">
                          <Button variant="outline" onClick={() => navigate("/")} disabled={isLoading}>
                            Cancel
                          </Button>
                          <Button onClick={handleCreateNotebook} disabled={isLoading || !notebookName.trim()} className="gap-2">
                            <Plus className="w-4 h-4" />
                            {isLoading ? "Creating..." : "Create Hypothesis"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>} />}

              {activeManagementTab === "activity" && <Card className="bg-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-500/10 rounded-lg">
                        <Activity className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Project Activity</CardTitle>
                        <CardDescription>
                          Recent actions and changes in this project
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.length === 0 ? <div className="text-center py-8">
                          <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No recent activity</p>
                          <p className="text-sm text-muted-foreground">Start working on your project to see activity here</p>
                        </div> : activities.map((activity, index) => <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className={`w-2 h-2 rounded-full ${activity.action.toLowerCase().includes('created') ? 'bg-green-500' : activity.action.toLowerCase().includes('deleted') ? 'bg-red-500' : activity.action.toLowerCase().includes('renamed') || activity.action.toLowerCase().includes('updated') ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.action}: {activity.item}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>)}
                    </div>
                  </CardContent>
                </Card>}

              {activeManagementTab === "settings" && <Card className="bg-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-orange-500/10 rounded-lg">
                        <FileText className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Project Settings</CardTitle>
                        <CardDescription>
                          Configure project preferences and options
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="project-name">Project Name</Label>
                        <div className="flex gap-2">
                          <Input id="project-name" value={editedProjectName} onChange={e => setEditedProjectName(e.target.value)} placeholder="Enter project name" />
                          <Button onClick={handleProjectNameChange} disabled={editedProjectName === currentProject?.name || !editedProjectName.trim()}>
                            Save
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project-description">Project Description</Label>
                        <Textarea id="project-description" placeholder="Describe your project..." rows={3} />
                      </div>
                      
                      <div className="border-t pt-6">
                        <div className="space-y-2">
                          <Label className="text-destructive">Danger Zone</Label>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete this project and all its data. This action cannot be undone.
                          </p>
                          <Button variant="destructive" onClick={handleDeleteProject} className="w-full">
                            Delete Project
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>}

              <DeleteConfirmDialog open={deleteDialog.open} onOpenChange={open => setDeleteDialog(prev => ({
          ...prev,
          open
        }))} onConfirm={confirmDeleteNotebook} title="Delete Notebook" description="Are you sure you want to delete this notebook? This action cannot be undone." itemName={deleteDialog.notebookName} />
              
              <DeleteConfirmDialog open={projectDeleteDialog.open} onOpenChange={open => setProjectDeleteDialog(prev => ({
          ...prev,
          open
        }))} onConfirm={confirmDeleteProject} title="Delete Project" description="Are you sure you want to permanently delete this project and all its notebooks? This action cannot be undone." itemName={projectDeleteDialog.projectName} />
            </div>
          </main>
    </Layout>;
};
export default NotebookCreation;