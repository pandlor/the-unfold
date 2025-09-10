import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { BookOpen, ArrowLeft, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const NotebookCreation = () => {
  const [notebookName, setNotebookName] = useState("");
  const [notebookDescription, setNotebookDescription] = useState("");
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { toast } = useToast();

  const handleCreateNotebook = () => {
    if (!notebookName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a notebook name",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Notebook Created",
      description: `${notebookName} has been created successfully!`
    });

    // Navigate to the notebook interface
    navigate(`/project/${projectId}/notebook`);
  };

  const handleBackToProjects = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={handleBackToProjects}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-lg mb-4">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Notebook</h1>
          <p className="text-lg text-muted-foreground">
            Project ID: {projectId}
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">New Analysis Notebook</CardTitle>
            <CardDescription>
              Create a notebook to organize your data analysis workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="notebook-name">Notebook Name</Label>
              <Input
                id="notebook-name"
                placeholder="Enter notebook name..."
                value={notebookName}
                onChange={(e) => setNotebookName(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notebook-description">Description (Optional)</Label>
              <Textarea
                id="notebook-description"
                placeholder="Describe your analysis goals..."
                value={notebookDescription}
                onChange={(e) => setNotebookDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={handleBackToProjects}
                className="text-lg py-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateNotebook}
                className="text-lg py-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Notebook
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing Notebooks */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Existing Notebooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-card/50 border-border cursor-pointer hover:bg-card/70 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Main Analysis</h3>
                    <p className="text-sm text-muted-foreground">Last updated today</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/project/${projectId}/notebook`}>Open</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 p-6 bg-card/50 rounded-lg border-border border">
          <h3 className="font-semibold mb-2">What you can do in a notebook:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Upload and manage your datasets</li>
            <li>• Profile and explore your data</li>
            <li>• Generate hypotheses and insights</li>
            <li>• Perform statistical analysis</li>
            <li>• Create comprehensive reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotebookCreation;