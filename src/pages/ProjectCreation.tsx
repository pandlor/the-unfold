import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Plus, Folder, BarChart3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const ProjectCreation = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateProject = () => {
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
    
    toast({
      title: "Project Created",
      description: `${projectName} has been created successfully!`
    });

    // Navigate to notebook creation
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-lg mb-4">
            <BarChart3 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">DataMinder</h1>
          <p className="text-xl text-muted-foreground">Create your data analysis project</p>
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
              <Input
                id="project-name"
                placeholder="Enter project name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea
                id="project-description"
                placeholder="Describe your project objectives..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
              />
            </div>

            <Button 
              onClick={handleCreateProject}
              className="w-full text-lg py-6"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Project
            </Button>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/50 border-border cursor-pointer hover:bg-card/70 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Sample Project 1</h3>
                    <p className="text-sm text-muted-foreground">Created 2 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/project/sample1">Open</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border cursor-pointer hover:bg-card/70 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Sample Project 2</h3>
                    <p className="text-sm text-muted-foreground">Created 1 week ago</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/project/sample2">Open</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default ProjectCreation;