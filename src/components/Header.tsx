import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";
const Header = () => {
  return (
    <header className="h-14 border-b border-dataminder-border bg-background flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-foreground">DataMinder</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Globe className="w-4 h-4 mr-2" />
          EN
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
        
        <Avatar className="w-8 h-8">
          <AvatarImage src="/lovable-uploads/e08a851c-41fb-4e7a-a429-1f8ccd1f671b.png" />
          <AvatarFallback className="bg-dataminder-primary text-white text-sm">A</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
export default Header;