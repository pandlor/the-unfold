import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AnalysisSidebar from "@/components/AnalysisSidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface Hypothesis {
  id: number;
  content: string;
}

const Hypotheses = () => {
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>([
    { id: 1, content: "" }
  ]);

  const addHypothesis = () => {
    const newId = Math.max(...hypotheses.map(h => h.id)) + 1;
    setHypotheses([...hypotheses, { id: newId, content: "" }]);
  };

  const removeHypothesis = (id: number) => {
    if (hypotheses.length > 1) {
      setHypotheses(hypotheses.filter(h => h.id !== id));
    } else {
      toast.error("You must have at least one hypothesis");
    }
  };

  const updateHypothesis = (id: number, content: string) => {
    setHypotheses(hypotheses.map(h => 
      h.id === id ? { ...h, content } : h
    ));
  };

  const saveHypotheses = () => {
    const filledHypotheses = hypotheses.filter(h => h.content.trim());
    if (filledHypotheses.length === 0) {
      toast.error("Please write at least one hypothesis before saving");
      return;
    }
    toast.success(`Saved ${filledHypotheses.length} hypothesis${filledHypotheses.length > 1 ? 'es' : ''}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <AnalysisSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-foreground">Hypotheses</h1>
              <Button onClick={saveHypotheses} className="gap-2">
                <Save className="h-4 w-4" />
                Save Hypotheses
              </Button>
            </div>
            
            <div className="mb-6">
              <p className="text-muted-foreground">
                Write down your research hypotheses. These are the assumptions or predictions you want to investigate based on your data.
              </p>
            </div>

            <div className="space-y-4">
              {hypotheses.map((hypothesis, index) => (
                <Card key={hypothesis.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-base font-medium">
                        Hypothesis {index + 1}
                      </Label>
                      {hypotheses.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeHypothesis(hypothesis.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={hypothesis.content}
                      onChange={(e) => updateHypothesis(hypothesis.id, e.target.value)}
                      placeholder="Write your hypothesis here... (e.g., 'There is a positive correlation between variable A and variable B', 'Group X will show significantly higher values than Group Y')"
                      className="min-h-[100px] resize-none"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={addHypothesis}
                className="w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Another Hypothesis
              </Button>
            </div>

            <div className="mt-8 bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2">Tips for Writing Good Hypotheses:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be specific and testable with your data</li>
                <li>• State the expected relationship between variables</li>
                <li>• Use clear, measurable terms</li>
                <li>• Consider both directional and non-directional hypotheses</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hypotheses;