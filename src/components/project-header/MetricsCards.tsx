import { Card, CardContent } from "@/components/ui/card";
import { Database, FileSpreadsheet, Target } from "lucide-react";

interface MetricsCardsProps {
  datasetsCount: number;
  profilingCompleted: boolean;
  hypothesesCount: number;
  projectId: string;
  onTabChange?: (tab: string) => void;
}

export const MetricsCards = ({
  datasetsCount,
  profilingCompleted,
  hypothesesCount,
  projectId,
  onTabChange,
}: MetricsCardsProps) => {
  return (
    <div className="space-y-1.5">
      <Card 
        className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-md cursor-pointer group"
        onClick={() => onTabChange?.("data")}
      >
        <CardContent className="p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-500/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/25 transition-colors">
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">Datasets</p>
              <p className="text-lg font-bold text-blue-600">{datasetsCount}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">files uploaded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/30 transition-all shadow-sm hover:shadow-md cursor-pointer group"
        onClick={() => onTabChange?.("profiling")}
      >
        <CardContent className="p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-500/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/25 transition-colors">
              <FileSpreadsheet className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">
                Data Profiling
              </p>
              <p
                className={`text-sm font-bold ${
                  profilingCompleted
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {profilingCompleted ? "Complete" : "Pending"}
              </p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                analysis status
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 hover:border-purple-500/30 transition-all shadow-sm hover:shadow-md cursor-pointer group"
        onClick={() => onTabChange?.("hypotheses")}
      >
        <CardContent className="p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-purple-500/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/25 transition-colors">
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">
                Hypotheses
              </p>
              <p className="text-lg font-bold text-purple-600">
                {hypothesesCount}
              </p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                created & tested
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
