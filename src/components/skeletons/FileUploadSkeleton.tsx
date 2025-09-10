import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const FileUploadSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
          <Skeleton className="w-12 h-12 mx-auto rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
            <Skeleton className="h-4 w-56 mx-auto" />
          </div>
          <Skeleton className="h-10 w-24 mx-auto rounded" />
        </div>
      </CardContent>
    </Card>
  );
};

export const FileListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Skeleton className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 min-w-0 space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-2 w-full mt-2" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};