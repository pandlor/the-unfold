import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProjectProvider } from "@/contexts/ProjectContext";
import ProjectCreation from "./pages/ProjectCreation";
import NotebookCreation from "./pages/NotebookCreation";
import NotebookInterface from "./pages/NotebookInterface";
import DataUpload from "./pages/DataUpload";
import DataProfiling from "./pages/DataProfiling";
import DataDescription from "./pages/DataDescription";
import Hypotheses from "./pages/Hypotheses";
import Analysis from "./pages/Analysis";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProjectProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProjectCreation />} />
          <Route path="/project/:projectId" element={<Navigate to="data-upload" replace />} />
          <Route path="/project/:projectId/data-upload" element={<DataUpload />} />
          <Route path="/project/:projectId/data-profiling" element={<DataProfiling />} />
          <Route path="/project/:projectId/data-description" element={<DataDescription />} />
          <Route path="/project/:projectId/notebook/:notebookId" element={<NotebookInterface />} />
          <Route path="/project/:projectId/notebook/:notebookId/hypotheses" element={<Hypotheses />} />
          <Route path="/project/:projectId/notebook/:notebookId/analysis" element={<Analysis />} />
          <Route path="/project/:projectId/notebook/:notebookId/report" element={<Report />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ProjectProvider>
</QueryClientProvider>
);

export default App;
