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
import { NoProjectsState } from "@/components/empty-states/NoProjectsState";
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
    
    const projectId = `proj_${Date.now()}`;
    addProject({
      id: projectId,
      name: projectName,
      updatedAt: "Just now"
    });

    toast({
      title: "Project created",
      description: `"${projectName}" has been created successfully.`,
    });

    setProjectName("");
    setProjectDescription("");
    setIsCreating(false);
    navigate(`/project/${projectId}`);
  };

  const scrollToForm = () => {
    document.getElementById('create-project-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    setDeleteDialog({ open: true, projectId, projectName });
  };

  const confirmDeleteProject = () => {
    const { projectId } = deleteDialog;
    deleteProject(projectId);
    toast({
      title: "Project deleted",
      description: `"${deleteDialog.projectName}" has been deleted successfully.`,
    });
    setDeleteDialog({ open: false, projectId: "", projectName: "" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Recent Projects Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Projects</h2>
              {isLoading ? (
                <ProjectListSkeleton count={6} />
              ) : projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Folder className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                              <p className="text-sm text-muted-foreground">{project.updatedAt}</p>
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
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
                        
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            {project.notebooks.length} notebook{project.notebooks.length !== 1 ? 's' : ''}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Last updated {project.updatedAt}</span>
                            <Button size="sm" asChild>
                              <Link to={`/project/${project.id}`}>
                                Open
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <NoProjectsState onCreateProject={scrollToForm} />
              )}
            </div>

            {/* Create New Project Section */}
            <div id="create-project-form">
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
                    <Input 
                      id="project-name" 
                      placeholder="Enter project name..." 
                      value={projectName} 
                      onChange={e => setProjectName(e.target.value)} 
                      className="text-lg" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your project..."
                      value={projectDescription}
                      onChange={e => setProjectDescription(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleCreateProject} 
                    className="w-full"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Project
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}
        onConfirm={confirmDeleteProject}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        itemName={deleteDialog.projectName}
      />
    </div>
  );
};

export default ProjectCreation;