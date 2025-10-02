import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Activity, Settings } from "lucide-react";

interface ManagementTabsProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

export const ManagementTabs = ({ activeTab, onTabChange }: ManagementTabsProps) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        Project Management
      </h3>

      <div className="flex gap-2">
        <Button
          variant={activeTab === "overview" ? "default" : "outline"}
          onClick={() => onTabChange?.("overview")}
          className="flex-1 gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          <span className="font-semibold text-sm">Dashboard</span>
        </Button>

        <Button
          variant={activeTab === "activity" ? "default" : "outline"}
          onClick={() => onTabChange?.("activity")}
          className="flex-1 gap-2"
        >
          <Activity className="w-4 h-4" />
          <span className="font-semibold text-sm">Activity</span>
        </Button>

        <Button
          variant={activeTab === "settings" ? "default" : "outline"}
          onClick={() => onTabChange?.("settings")}
          className="flex-1 gap-2"
        >
          <Settings className="w-4 h-4" />
          <span className="font-semibold text-sm">Settings</span>
        </Button>
      </div>
    </div>
  );
};
