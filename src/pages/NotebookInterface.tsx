import Layout from "@/components/Layout";
import AnalysisSidebar from "@/components/AnalysisSidebar";
import ChatInterface from "@/components/ChatInterface";

const NotebookInterface = () => {
  return (
    <Layout>
      <div className="flex flex-1">
        <AnalysisSidebar />
        <main className="flex-1">
          <ChatInterface />
        </main>
      </div>
    </Layout>
  );
};

export default NotebookInterface;
