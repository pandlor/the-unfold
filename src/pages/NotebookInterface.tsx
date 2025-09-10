import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";

const NotebookInterface = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
};

export default NotebookInterface;
