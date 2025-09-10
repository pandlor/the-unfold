import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;
