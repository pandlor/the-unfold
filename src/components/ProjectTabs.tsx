import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Plus, 
  Activity, 
  Settings, 
  BarChart3, 
  Clock,
  FileText,
  TrendingUp
} from "lucide-react";
import { NotebookCard } from "@/components/NotebookCard";
import { NoNotebooksState } from "@/components/empty-states/NoNotebooksState";
import { Project, Notebook } from "@/contexts/ProjectContext";

interface ProjectTabsProps {
  project: Project;
  notebooks: Notebook[];
  projectId: string;
  onCreateNotebook: () => void;
  onDeleteNotebook: (notebookId: string, notebookName: string) => void;
  createNotebookSection: React.ReactNode;
}

export const ProjectTabs = ({ 
  project, 
  notebooks, 
  projectId, 
  onCreateNotebook, 
  onDeleteNotebook,
  createNotebookSection 
}: ProjectTabsProps) => {
  const recentActivity = [
    { action: "Notebook created", item: "Customer Analysis", time: "2 hours ago" },
    { action: "Data uploaded", item: "sales_data.csv", time: "1 day ago" },
    { action: "Report generated", item: "Q4 Summary", time: "3 days ago" },
  ];

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="overview" className="gap-2">
          <BarChart3 className="w-4 h-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="notebooks" className="gap-2">
          <BookOpen className="w-4 h-4" />
          Notebooks ({notebooks.length})
        </TabsTrigger>
        <TabsTrigger value="activity" className="gap-2">
          <Activity className="w-4 h-4" />
          Activity
        </TabsTrigger>
        <TabsTrigger value="settings" className="gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Notebooks</p>
                  <p className="text-2xl font-bold">{notebooks.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-2xl font-bold">{project.updatedAt}</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                    Active
                  </Badge>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recent Notebooks
              </CardTitle>
              <CardDescription>
                Your most recently accessed notebooks
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notebooks.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No notebooks yet</p>
                  <Button onClick={onCreateNotebook} size="sm" className="mt-3">
                    Create your first notebook
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {notebooks.slice(0, 3).map((notebook) => (
                    <div key={notebook.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{notebook.name}</p>
                          <p className="text-sm text-muted-foreground">{notebook.updatedAt}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Open</Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest actions in your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.action} <span className="font-medium">{activity.item}</span></p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to get you started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={onCreateNotebook} className="h-auto p-4 flex-col gap-2">
                <Plus className="w-6 h-6" />
                <span>Create Notebook</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <FileText className="w-6 h-6" />
                <span>Import Data</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notebooks" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">All Notebooks</h2>
            <p className="text-muted-foreground">
              Manage and organize your analysis notebooks
            </p>
          </div>
          <Button onClick={onCreateNotebook} className="gap-2">
            <Plus className="w-4 h-4" />
            New Notebook
          </Button>
        </div>

        {notebooks.length === 0 ? (
          <NoNotebooksState onCreateNotebook={onCreateNotebook} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notebooks.map((notebook) => (
              <NotebookCard
                key={notebook.id}
                notebook={notebook}
                projectId={projectId}
                onDelete={onDeleteNotebook}
              />
            ))}
          </div>
        )}

        <div className="mt-8">
          {createNotebookSection}
        </div>
      </TabsContent>

      <TabsContent value="activity" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Project Activity</h2>
          <p className="text-muted-foreground">
            Track all actions and changes in your project
          </p>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-muted-foreground">{activity.item}</p>
                    <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <Badge variant="outline">{activity.action.split(' ')[0]}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Project Settings</h2>
          <p className="text-muted-foreground">
            Configure your project preferences and options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic project configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Project Name</label>
                <p className="text-sm text-muted-foreground mt-1">{project.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Project ID</label>
                <p className="text-sm text-muted-foreground mt-1">{project.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Created</label>
                <p className="text-sm text-muted-foreground mt-1">{project.updatedAt}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>
                Project management actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Export Project Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Archive Project
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Delete Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};