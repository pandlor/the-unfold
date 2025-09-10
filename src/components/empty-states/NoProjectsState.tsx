import { Plus, Folder, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface NoProjectsStateProps {
  onCreateProject: () => void;
}

export const NoProjectsState = ({ onCreateProject }: NoProjectsStateProps) => {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardContent className="flex flex-col items-center justify-center py-16 px-8 text-center">
        <div className="relative mb-8">
          {/* Decorative illustration */}
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Folder className="w-12 h-12 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 max-w-md">
          <h3 className="text-2xl font-semibold text-foreground">
            Start Your Data Journey
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Create your first project to begin analyzing data, generating insights, and building comprehensive reports.
          </p>
          
          <div className="pt-4">
            <Button 
              onClick={onCreateProject}
              size="lg"
              className="gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Your First Project
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-sm">
            <div className="flex flex-col items-center space-y-2 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-xs">1</span>
              </div>
              <span className="text-muted-foreground text-center">Upload Data</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-xs">2</span>
              </div>
              <span className="text-muted-foreground text-center">Analyze</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-xs">3</span>
              </div>
              <span className="text-muted-foreground text-center">Get Insights</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};