import { useState } from "react";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";

interface Hypothesis {
  id: number;
  content: string;
}

const Hypotheses = () => {
  const { toast } = useToast();
  const { projectId } = useParams();
  const { updateProjectProgress } = useProjects();
  const [hypothesis, setHypothesis] = useState<string>("");

  const saveHypothesis = () => {
    if (!hypothesis.trim()) {
      toast({
        title: "No hypothesis to save",
        description: "Please write your hypothesis before saving",
        variant: "destructive",
      });
      return;
    }
    
    updateProjectProgress(projectId!, {
      hypothesesDefined: true,
      hypothesesCount: 1
    });
    
    toast({
      title: "Hypothesis saved",
      description: "Your hypothesis has been saved successfully",
    });
  };

  return (
    <Layout>
      <ProgressBar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-foreground">Hypothesis</h1>
            <Button onClick={saveHypothesis} className="gap-2">
              <Save className="h-4 w-4" />
              Save Hypothesis
            </Button>
          </div>
          
          <div className="mb-6">
            <p className="text-muted-foreground">
              Define your research hypothesis for this notebook. This workspace is dedicated to analyzing and testing this single hypothesis.
            </p>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <Label className="text-base font-medium">
                Research Hypothesis
              </Label>
            </CardHeader>
            <CardContent>
              <Textarea
                value={hypothesis}
                onChange={(e) => setHypothesis(e.target.value)}
                placeholder="Write your hypothesis here... (e.g., 'There is a positive correlation between variable A and variable B', 'Group X will show significantly higher values than Group Y')"
                className="min-h-[120px] resize-none"
              />
            </CardContent>
          </Card>

          <div className="mt-8 bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Tips for Writing a Good Hypothesis:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be specific and testable with your data</li>
              <li>• State the expected relationship between variables</li>
              <li>• Use clear, measurable terms</li>
              <li>• Consider both directional and non-directional hypotheses</li>
              <li>• Focus on one testable prediction per notebook</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
 };

export default Hypotheses;