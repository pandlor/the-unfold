import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, MoreVertical, Trash2, Clock, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Notebook, useProjects } from "@/contexts/ProjectContext";

interface NotebookCardProps {
  notebook: Notebook;
  projectId: string;
  onDelete: (notebookId: string, notebookName: string) => void;
}

export const NotebookCard = ({ notebook, projectId, onDelete }: NotebookCardProps) => {
  const navigate = useNavigate();
  const { setCurrentNotebook } = useProjects();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Set this notebook as current when clicked
    setCurrentNotebook(projectId, notebook.id);
    navigate(`/project/${projectId}/notebook`);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleCardClick} className="block cursor-pointer">
      <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {notebook.name}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span>{notebook.updatedAt}</span>
                </div>
                <div className="mt-3">
                  <Badge variant="outline" className="text-xs">
                    Ready to use
                  </Badge>
                </div>
              </div>
            </div>
            
            <div onClick={handleMenuClick} className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(notebook.id, notebook.name);
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Notebook
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};