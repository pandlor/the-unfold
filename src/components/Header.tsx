import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-dataminder-primary to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DM</span>
            </div>
            <span className="text-xl font-semibold text-foreground">DataMinder</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Home
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              Updates
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              Services
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              Knowledge base
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              About Us
            </Button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <span className="mr-1">👤</span>
            View profile
          </Button>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <Globe className="w-4 h-4 mr-1" />
            EN
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;