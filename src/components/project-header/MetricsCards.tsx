import { Card, CardContent } from "@/components/ui/card";
import { Database, FileSpreadsheet, Target } from "lucide-react";

interface MetricsCardsProps {
  datasetsCount: number;
  profilingCompleted: boolean;
  hypothesesCount: number;
}

export const MetricsCards = ({
  datasetsCount,
  profilingCompleted,
  hypothesesCount,
}: MetricsCardsProps) => {
  return (
    <div className="space-y-2">
      <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-md">
        <CardContent className="p-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-blue-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">Datasets</p>
              <p className="text-xl font-bold text-blue-600">{datasetsCount}</p>
              <p className="text-[10px] text-muted-foreground">files uploaded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/30 transition-all shadow-sm hover:shadow-md">
        <CardContent className="p-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-green-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">
                Data Profiling
              </p>
              <p
                className={`text-base font-bold ${
                  profilingCompleted
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {profilingCompleted ? "Complete" : "Pending"}
              </p>
              <p className="text-[10px] text-muted-foreground">
                analysis status
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 hover:border-purple-500/30 transition-all shadow-sm hover:shadow-md">
        <CardContent className="p-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-purple-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">
                Hypotheses
              </p>
              <p className="text-xl font-bold text-purple-600">
                {hypothesesCount}
              </p>
              <p className="text-[10px] text-muted-foreground">
                created & tested
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
