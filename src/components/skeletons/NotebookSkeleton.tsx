import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const NotebookCardSkeleton = () => {
  return (
    <Card className="bg-card/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div className="flex-1 space-y-3">
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex items-center gap-2">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
          <Skeleton className="w-8 h-8 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};

export const NotebookListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <NotebookCardSkeleton key={index} />
      ))}
    </div>
  );
};