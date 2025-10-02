import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Activity, Settings } from "lucide-react";

interface ManagementTabsProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

export const ManagementTabs = ({ activeTab, onTabChange }: ManagementTabsProps) => {
  return (
    <Card className="bg-card border-border/50 shadow-sm h-full">
      <CardContent className="p-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Project Management
        </h3>

        <div className="space-y-2">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => onTabChange?.("overview")}
            className={`w-full justify-start gap-3 h-auto py-3 transition-all ${
              activeTab === "overview"
                ? "shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activeTab === "overview"
                  ? "bg-primary-foreground/20"
                  : "bg-muted"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm">Dashboard</div>
              <div
                className={`text-xs ${
                  activeTab === "overview"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                Project overview & insights
              </div>
            </div>
          </Button>

          <Button
            variant={activeTab === "activity" ? "default" : "ghost"}
            onClick={() => onTabChange?.("activity")}
            className={`w-full justify-start gap-3 h-auto py-3 transition-all ${
              activeTab === "activity"
                ? "shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activeTab === "activity"
                  ? "bg-primary-foreground/20"
                  : "bg-muted"
              }`}
            >
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm">Activity</div>
              <div
                className={`text-xs ${
                  activeTab === "activity"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                Recent actions & history
              </div>
            </div>
          </Button>

          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            onClick={() => onTabChange?.("settings")}
            className={`w-full justify-start gap-3 h-auto py-3 transition-all ${
              activeTab === "settings"
                ? "shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activeTab === "settings"
                  ? "bg-primary-foreground/20"
                  : "bg-muted"
              }`}
            >
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm">Settings</div>
              <div
                className={`text-xs ${
                  activeTab === "settings"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                Project configuration
              </div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
