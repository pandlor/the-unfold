import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const NewsletterSection = () => {
  return (
    <section className="bg-dataminder-secondary border-t border-dataminder-border p-6">
      <div className="max-w-md mx-auto text-center space-y-4">
        <h3 className="text-lg font-medium text-foreground">Stay Updated</h3>
        <p className="text-sm text-muted-foreground">
          Get the latest updates on DataMinder features and insights.
        </p>
        
        <div className="flex space-x-2">
          <Input 
            placeholder="Enter your email" 
            className="flex-1" 
            type="email"
          />
          <Button className="bg-dataminder-primary hover:bg-dataminder-primary/90 text-white">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};
export default NewsletterSection;