import React, { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

export interface Notebook {
  id: string;
  name: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  updatedAt: string;
  notebooks: Notebook[];
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'notebooks'>) => void;
  deleteProject: (projectId: string) => void;
  addNotebook: (projectId: string, notebook: Notebook) => void;
  deleteNotebook: (projectId: string, notebookId: string) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

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
    ]
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
    ]
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
    ]
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
    ]
  }
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useLocalStorage<Project[]>('dataminder-projects', initialProjects);

  const addProject = (newProject: Omit<Project, 'notebooks'>) => {
    const project: Project = {
      ...newProject,
      notebooks: []
    };
    setProjects(prev => [project, ...prev]);
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const addNotebook = (projectId: string, notebook: Notebook) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, notebooks: [notebook, ...project.notebooks] }
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

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      deleteProject,
      addNotebook,
      deleteNotebook,
      updateProject
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