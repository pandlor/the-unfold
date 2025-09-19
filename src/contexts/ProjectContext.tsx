import React, { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useProjectActivity } from "@/hooks/useProjectActivity";

export interface Notebook {
  id: string;
  name: string;
  updatedAt: string;
}

export interface ProjectProgress {
  dataUploaded: boolean;
  profilingCompleted: boolean;
  descriptionCompleted: boolean;
  hypothesesDefined: boolean;
  analysisCompleted: boolean;
  reportGenerated: boolean;
  uploadedDatasets: string[];
  hypothesesCount: number;
}

export interface Project {
  id: string;
  name: string;
  updatedAt: string;
  notebooks: Notebook[];
  currentNotebookId?: string; // Track which notebook is currently active
  progress?: ProjectProgress;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'notebooks'>) => void;
  deleteProject: (projectId: string) => void;
  addNotebook: (projectId: string, notebook: Notebook) => void;
  deleteNotebook: (projectId: string, notebookId: string) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  setCurrentNotebook: (projectId: string, notebookId: string) => void;
  logActivity: (projectId: string, action: string, item: string) => void;
  updateProjectProgress: (projectId: string, updates: Partial<ProjectProgress>) => void;
  calculateProjectProgress: (projectId: string) => number;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const getDefaultProgress = (): ProjectProgress => ({
  dataUploaded: false,
  profilingCompleted: false,
  descriptionCompleted: false,
  hypothesesDefined: false,
  analysisCompleted: false,
  reportGenerated: false,
  uploadedDatasets: [],
  hypothesesCount: 0,
});

const initialProjects: Project[] = [
  {
    id: "sample1",
    name: "Sample Project 1",
    updatedAt: "2 days ago",
    notebooks: [
      {
        id: "notebook1",
        name: "Main Analysis",
        updatedAt: "2 hours ago"
      },
      {
        id: "notebook2",
        name: "Data Exploration",
        updatedAt: "1 day ago"
      }
    ],
    progress: {
      ...getDefaultProgress(),
      dataUploaded: true,
      hypothesesDefined: true,
      uploadedDatasets: ["customer_data.csv", "sales_data.xlsx"],
      hypothesesCount: 2,
    }
  },
  {
    id: "sample2",
    name: "Sample Project 2",
    updatedAt: "1 week ago",
    notebooks: [
      {
        id: "notebook1",
        name: "Customer Insights",
        updatedAt: "3 days ago"
      }
    ],
    progress: {
      ...getDefaultProgress(),
      dataUploaded: true,
      uploadedDatasets: ["analytics_data.csv"],
    }
  },
  {
    id: "proj_1757530116846",
    name: "Customer Analysis",
    updatedAt: "3 hours ago",
    notebooks: [
      {
        id: "notebook1",
        name: "Segmentation Analysis",
        updatedAt: "1 hour ago"
      },
      {
        id: "notebook2",
        name: "Behavior Patterns",
        updatedAt: "2 hours ago"
      }
    ],
    progress: getDefaultProgress()
  },
  {
    id: "proj_1757530116847",
    name: "Sales Dashboard",
    updatedAt: "Yesterday",
    notebooks: [
      {
        id: "notebook1",
        name: "Revenue Analysis",
        updatedAt: "Yesterday"
      }
    ],
    progress: getDefaultProgress()
  }
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useLocalStorage<Project[]>('dataminder-projects', initialProjects);
  const [activityTrackers] = useState<Map<string, ReturnType<typeof useProjectActivity>>>(new Map());

  const addProject = (newProject: Omit<Project, 'notebooks'>) => {
    const project: Project = {
      ...newProject,
      notebooks: [],
      progress: getDefaultProgress()
    };
    setProjects(prev => [project, ...prev]);
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const addNotebook = (projectId: string, notebook: Notebook) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            notebooks: [notebook, ...project.notebooks],
            currentNotebookId: notebook.id // Set the new notebook as current
          }
        : project
    ));
  };

  const deleteNotebook = (projectId: string, notebookId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, notebooks: project.notebooks.filter(n => n.id !== notebookId) }
        : project
    ));
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, ...updates }
        : project
    ));
  };

  const setCurrentNotebook = (projectId: string, notebookId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, currentNotebookId: notebookId }
        : project
    ));
  };

  const updateProjectProgress = (projectId: string, updates: Partial<ProjectProgress>) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            progress: { 
              ...getDefaultProgress(), 
              ...project.progress, 
              ...updates 
            },
            updatedAt: new Date().toLocaleString()
          }
        : project
    ));
  };

  const calculateProjectProgress = (projectId: string): number => {
    const project = projects.find(p => p.id === projectId);
    if (!project?.progress) return 0;

    const progress = project.progress;
    const totalSteps = 6;
    let completedSteps = 0;

    if (progress.dataUploaded) completedSteps++;
    if (progress.profilingCompleted) completedSteps++;
    if (progress.descriptionCompleted) completedSteps++;
    if (progress.hypothesesDefined) completedSteps++;
    if (progress.analysisCompleted) completedSteps++;
    if (progress.reportGenerated) completedSteps++;

    return Math.round((completedSteps / totalSteps) * 100);
  };

  const logActivity = (projectId: string, action: string, item: string) => {
    // This will be handled by the component using useProjectActivity hook
    // We'll track it there to avoid circular dependencies
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      deleteProject,
      addNotebook,
      deleteNotebook,
      updateProject,
      setCurrentNotebook,
      logActivity,
      updateProjectProgress,
      calculateProjectProgress
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};