import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  FolderOpen, 
  MoreVertical, 
  Trash2, 
  Clock, 
  FileText, 
  ArrowUpRight,
  Activity,
  Calendar
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Project } from "@/contexts/ProjectContext";

interface ProjectCardProps {
  project: Project;
  onDelete: (projectId: string, projectName: string) => void;
}

export const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const navigate = useNavigate();
  
  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getStatusColor = (notebookCount: number) => {
    if (notebookCount === 0) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    if (notebookCount < 3) return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    return "bg-green-500/10 text-green-600 border-green-500/20";
  };

  const getStatusText = (notebookCount: number) => {
    if (notebookCount === 0) return "New";
    if (notebookCount < 3) return "Active";
    return "Productive";
  };

  return (
    <Link to={`/project/${project.id}`} className="block group">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-200">
                <FolderOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {project.name}
                  </CardTitle>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Updated {project.updatedAt}</span>
                </div>
              </div>
            </div>
            
            <div onClick={handleMenuClick}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(project.id, project.name);
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Status and Stats */}
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline" 
                className={getStatusColor(project.notebooks.length)}
              >
                {getStatusText(project.notebooks.length)}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  <span>{project.notebooks.length}</span>
                </div>
              </div>
            </div>

            {/* Notebooks Preview */}
            {project.notebooks.length > 0 ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Recent Notebooks</div>
                <div className="space-y-1">
                  {project.notebooks.slice(0, 2).map((notebook) => (
                    <Button
                      key={notebook.id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/project/${project.id}/notebook`);
                      }}
                      className="w-full flex items-center gap-2 p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                        <FileText className="w-3 h-3 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{notebook.name}</p>
                        <p className="text-xs text-muted-foreground">{notebook.updatedAt}</p>
                      </div>
                    </Button>
                  ))}
                  {project.notebooks.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center py-1">
                      +{project.notebooks.length - 2} more notebook{project.notebooks.length - 2 !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 border-2 border-dashed border-border/50 rounded-lg bg-muted/20">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No notebooks yet</p>
                <p className="text-xs text-muted-foreground">Click to create your first notebook</p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="pt-2 border-t border-border/50">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  <span>Project Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{project.updatedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};