import { Button } from "@/components/ui/button";
import { BarChart3, Activity, Settings } from "lucide-react";

interface ManagementTabsProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

export const ManagementTabs = ({ activeTab, onTabChange }: ManagementTabsProps) => {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        Project Management
      </h3>

      <div className="flex gap-3">
        <Button
          variant={activeTab === "overview" ? "default" : "outline"}
          onClick={() => onTabChange?.("overview")}
          className="flex-1 gap-2 h-auto py-3"
        >
          <BarChart3 className="w-5 h-5" />
          <div className="text-left">
            <div className="font-semibold text-sm">Dashboard</div>
            <div className="text-xs opacity-80">Project overview & insights</div>
          </div>
        </Button>

        <Button
          variant={activeTab === "activity" ? "default" : "outline"}
          onClick={() => onTabChange?.("activity")}
          className="flex-1 gap-2 h-auto py-3"
        >
          <Activity className="w-5 h-5" />
          <div className="text-left">
            <div className="font-semibold text-sm">Activity</div>
            <div className="text-xs opacity-80">Recent actions & history</div>
          </div>
        </Button>

        <Button
          variant={activeTab === "settings" ? "default" : "outline"}
          onClick={() => onTabChange?.("settings")}
          className="flex-1 gap-2 h-auto py-3"
        >
          <Settings className="w-5 h-5" />
          <div className="text-left">
            <div className="font-semibold text-sm">Settings</div>
            <div className="text-xs opacity-80">Project configuration</div>
          </div>
        </Button>
      </div>
    </div>
  );
};
