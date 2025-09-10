import Sidebar from "@/components/Sidebar";
import AnalysisSidebar from "@/components/AnalysisSidebar";
import ChatInterface from "@/components/ChatInterface";
import Header from "@/components/Header";

const NotebookInterface = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <AnalysisSidebar />
        <main className="flex-1">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
};

export default NotebookInterface;
