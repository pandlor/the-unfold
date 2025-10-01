import { Card, CardContent } from "@/components/ui/card";

const CIRCLE_RADIUS = 43.75;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

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
        <div className="text-center">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Overall Progress
          </h3>
          <p className="text-xs text-muted-foreground/80 mb-4">
            Project completion status
          </p>

          <div className="relative w-full aspect-square max-w-[160px] mx-auto mb-4">
            <svg className="transform -rotate-90 w-full h-full">
              {/* Background circle */}
              <circle
                cx="50%"
                cy="50%"
                r={`${CIRCLE_RADIUS}%`}
                stroke="currentColor"
                strokeWidth="7.5%"
                fill="none"
                className="text-muted/20"
              />
              {/* Progress circle */}
              <circle
                cx="50%"
                cy="50%"
                r={`${CIRCLE_RADIUS}%`}
                stroke={progress === 0 ? "currentColor" : "url(#progressGradient)"}
                strokeWidth="7.5%"
                fill="none"
                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                strokeDashoffset={CIRCLE_CIRCUMFERENCE - (progress / 100) * CIRCLE_CIRCUMFERENCE}
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

          <div className="space-y-2 text-left">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Data Upload</span>
              <span
                className={`font-medium ${
                  uploadedDatasets > 0
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {uploadedDatasets > 0 ? "✓" : "○"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Data Profiling</span>
              <span
                className={`font-medium ${
                  profilingCompleted
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {profilingCompleted ? "✓" : "○"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Hypotheses</span>
              <span
                className={`font-medium ${
                  hypothesesCount > 0
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {hypothesesCount > 0 ? "✓" : "○"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Analysis</span>
              <span
                className={`font-medium ${
                  analysisCompleted
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {analysisCompleted ? "✓" : "○"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
