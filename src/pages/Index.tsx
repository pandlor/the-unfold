import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <ChatInterface />
          <NewsletterSection />
        </main>
      </div>
    </div>
  );
};

export default Index;
