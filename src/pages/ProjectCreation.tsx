import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Plus, Folder, BarChart3, Trash2, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectListSkeleton } from "@/components/skeletons/ProjectCardSkeleton";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjects } from "@/contexts/ProjectContext";

const ProjectCreation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, projectId: "", projectName: "" });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projects, addProject, deleteProject } = useProjects();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (!projectName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project name",
        variant: "destructive"
      });
      return;
    }

    // Generate a simple project ID
    const projectId = `proj_${Date.now()}`;
    
    // Add new project using context
    addProject({
      id: projectId,
      name: projectName,
      updatedAt: "Just created"
    });
    
    toast({
      title: "Project Created",
      description: `${projectName} has been created successfully!`
    });

    // Clear form
    setProjectName("");
    setProjectDescription("");

    // Navigate to notebook creation
    navigate(`/project/${projectId}`);
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    setDeleteDialog({ open: true, projectId, projectName });
  };

  const confirmDeleteProject = () => {
    const { projectId } = deleteDialog;
    deleteProject(projectId);
    toast({
      title: "Project Deleted",
      description: `${deleteDialog.projectName} has been deleted successfully.`
    });
    setDeleteDialog({ open: false, projectId: "", projectName: "" });
  };
  return <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-lg mb-4">
                <BarChart3 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2">DataMinder</h1>
              <p className="text-xl text-muted-foreground">Create your data analysis project</p>
            </div>

            {/* Recent Projects */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-center">Recent Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-card/50 border-border hover:bg-card/70 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 cursor-pointer" onClick={() => navigate(`/project/${project.id}`)}>
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.updatedAt}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/project/${project.id}`}>Open</Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleDeleteProject(project.id, project.name)}
                                className="text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Project
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create New Project</CardTitle>
                <CardDescription>
                  Start your data analysis journey by creating a new project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" placeholder="Enter project name..." value={projectName} onChange={e => setProjectName(e.target.value)} className="text-lg" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-description">Project Description</Label>
                  <Textarea id="project-description" placeholder="Describe your project objectives..." value={projectDescription} onChange={e => setProjectDescription(e.target.value)} rows={4} />
                </div>

                <Button onClick={handleCreateProject} className="w-full text-lg py-6" size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Project
                </Button>
              </CardContent>
            </Card>

            {/* Recent Projects */}
            

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="bg-card/50 border-border">
                <CardContent className="p-4 text-center">
                  <Folder className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Organize</h3>
                  <p className="text-sm text-muted-foreground">Keep your data projects organized</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Analyze</h3>
                  <p className="text-sm text-muted-foreground">Powerful analysis tools</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-4 text-center">
                  <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Collaborate</h3>
                  <p className="text-sm text-muted-foreground">Share insights with your team</p>
                </CardContent>
              </Card>
            </div>
            
            <DeleteConfirmDialog
              open={deleteDialog.open}
              onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}
              onConfirm={confirmDeleteProject}
              title="Delete Project"
              description="Are you sure you want to delete"
              itemName={deleteDialog.projectName}
            />
          </div>
        </main>
      </div>
    </div>;
};
export default ProjectCreation;