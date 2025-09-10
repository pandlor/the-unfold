import { ArrowLeft, FolderOpen, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Project } from "@/contexts/ProjectContext";

interface ProjectHeaderProps {
  project: Project;
  showBackButton?: boolean;
}

export const ProjectHeader = ({ project, showBackButton = true }: ProjectHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="p-6">
        {showBackButton && (
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        )}
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <FolderOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Updated {project.updatedAt}
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {project.notebooks.length} notebook{project.notebooks.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
          
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Active Project
          </Badge>
        </div>
      </div>
    </div>
  );
};