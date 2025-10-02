import { Card, CardContent } from "@/components/ui/card";

interface ProgressCircleProps {
  progress: number;
  uploadedDatasets: number;
  profilingCompleted: boolean;
  hypothesesCount: number;
  analysisCompleted: boolean;
}

export const ProgressCircle = ({
  progress,
  uploadedDatasets,
  profilingCompleted,
  hypothesesCount,
  analysisCompleted,
}: ProgressCircleProps) => {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
          Overall Progress
        </h3>
        <p className="text-xs text-muted-foreground/80 mb-6">
          Project completion status
        </p>

        <div className="flex items-center gap-6">
          {/* Progress Circle */}
          <div className="relative w-[140px] h-[140px] flex-shrink-0">
            <svg className="transform -rotate-90 w-full h-full">
              {/* Background circle */}
              <circle
                cx="50%"
                cy="50%"
                r="43.75%"
                stroke="currentColor"
                strokeWidth="7.5%"
                fill="none"
                className="text-muted/20"
              />
              {/* Progress circle */}
              <circle
                cx="50%"
                cy="50%"
                r="43.75%"
                stroke={
                  progress === 0 ? "currentColor" : "url(#progressGradient)"
                }
                strokeWidth="7.5%"
                fill="none"
                strokeDasharray={2 * Math.PI * 43.75}
                strokeDashoffset={
                  2 * Math.PI * 43.75 - (progress / 100) * 2 * Math.PI * 43.75
                }
                className={`transition-all duration-700 ease-out ${
                  progress === 0 ? "text-muted/40" : ""
                }`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    className="text-primary"
                    stopColor="currentColor"
                  />
                  <stop
                    offset="100%"
                    className="text-primary/60"
                    stopColor="currentColor"
                  />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">
                {progress.toFixed(0)}%
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                complete
              </span>
            </div>
          </div>

          {/* Progress Items */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  uploadedDatasets > 0
                    ? "bg-green-100 text-green-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {uploadedDatasets > 0 ? "✓" : "○"}
              </span>
              <span className="text-muted-foreground">Data Upload</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  profilingCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {profilingCompleted ? "✓" : "○"}
              </span>
              <span className="text-muted-foreground">Data Profiling</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  hypothesesCount > 0
                    ? "bg-green-100 text-green-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {hypothesesCount > 0 ? "✓" : "○"}
              </span>
              <span className="text-muted-foreground">Hypotheses</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  analysisCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {analysisCompleted ? "✓" : "○"}
              </span>
              <span className="text-muted-foreground">Analysis</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
