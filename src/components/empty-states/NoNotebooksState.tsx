import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles, Plus } from "lucide-react";

interface NoNotebooksStateProps {
  onCreateNotebook: () => void;
}

export const NoNotebooksState = ({ onCreateNotebook }: NoNotebooksStateProps) => {
  return (
    <Card className="border-2 border-dashed border-border/50 bg-card/30">
      <CardContent className="p-12 text-center">
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full"></div>
          <div className="absolute inset-2 bg-primary/20 rounded-full flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-primary" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-primary animate-pulse" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Create Your First Hypothesis
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Start your research journey by formulating clear, testable hypotheses. Create your first hypothesis to guide your data analysis and discovery process.
        </p>
        
        <Button onClick={onCreateNotebook} size="lg" className="mb-6">
          <Plus className="w-5 h-5 mr-2" />
          Create Hypothesis
        </Button>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-primary/50 rounded-full"></div>
            <span>Formulate testable research questions</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-primary/50 rounded-full"></div>
            <span>Design experiments and analysis plans</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-primary/50 rounded-full"></div>
            <span>Document findings and conclusions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};