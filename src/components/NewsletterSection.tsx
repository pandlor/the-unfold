import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  return (
    <div className="bg-gradient-to-r from-dataminder-secondary via-dataminder-muted to-dataminder-secondary p-6 border-t border-dataminder-border">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Want to analyze your data smarter?
          </h3>
        </div>
        
        <div className="flex w-full md:w-auto space-x-3">
          <Input
            placeholder="hello@example.com"
            className="flex-1 md:w-64 bg-background border-border focus:border-primary focus:ring-primary"
          />
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
            Sign up for DM's newsletter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;