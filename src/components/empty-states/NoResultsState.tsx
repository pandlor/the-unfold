import { Search, Filter, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface NoResultsStateProps {
  searchQuery?: string;
  onClearSearch?: () => void;
  onCreateNew?: () => void;
  type?: 'projects' | 'notebooks' | 'files';
}

export const NoResultsState = ({ 
  searchQuery,
  onClearSearch,
  onCreateNew,
  type = 'projects'
}: NoResultsStateProps) => {
  const getTypeInfo = () => {
    const types = {
      projects: {
        title: 'No Projects Found',
        description: 'Try adjusting your search or create a new project',
        createLabel: 'Create Project',
        icon: Filter
      },
      notebooks: {
        title: 'No Notebooks Found', 
        description: 'No notebooks match your criteria',
        createLabel: 'Create Notebook',
        icon: Calendar
      },
      files: {
        title: 'No Files Found',
        description: 'No files match your search',
        createLabel: 'Upload Files',
        icon: Search
      }
    };
    
    return types[type];
  };

  const typeInfo = getTypeInfo();

  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardContent className="flex flex-col items-center justify-center py-12 px-8 text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <typeInfo.icon className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-orange-600" />
          </div>
        </div>
        
        <div className="space-y-4 max-w-sm">
          <h3 className="text-lg font-semibold text-foreground">
            {typeInfo.title}
          </h3>
          
          {searchQuery ? (
            <p className="text-muted-foreground">
              No results for <span className="font-medium">"{searchQuery}"</span>
            </p>
          ) : (
            <p className="text-muted-foreground">
              {typeInfo.description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            {searchQuery && onClearSearch && (
              <Button 
                variant="outline" 
                onClick={onClearSearch}
                className="gap-2"
              >
                <Search className="w-4 h-4" />
                Clear Search
              </Button>
            )}
            
            {onCreateNew && (
              <Button 
                onClick={onCreateNew}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {typeInfo.createLabel}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};