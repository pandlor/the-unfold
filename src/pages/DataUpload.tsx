import Layout from "@/components/Layout";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/contexts/ProjectContext";

const DataUpload = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { toast } = useToast();
  const { projects, updateProjectProgress } = useProjects();
  
  const project = projects.find(p => p.id === projectId);

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    const fileNames = files.map(file => file.name);
    
    updateProjectProgress(projectId!, {
      dataUploaded: true,
      uploadedDatasets: fileNames
    });
  };

  const handleContinue = () => {
    navigate(`/project/${projectId}`);
    toast({
      title: "Data uploaded successfully",
      description: "Your files have been uploaded to the project.",
    });
  };

  return (
    <Layout>
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Upload Project Data</h1>
              <p className="text-muted-foreground">
                  Upload datasets for <span className="font-medium">{project?.name}</span>. 
                  These files will be available to all notebooks in this project.
                </p>
              </div>
            </div>
            
            <FileUpload onFileUpload={handleFileUpload} />
            
            <div className="flex justify-end mt-8">
              <Button onClick={handleContinue}>
                Back to Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default DataUpload;