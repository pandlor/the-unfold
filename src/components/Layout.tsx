import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export default function Layout({ children, showHeader = true }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        {showHeader && (
          <header className="h-auto border-b border-border bg-background">
            <div className="flex items-center px-4 py-2">
              <SidebarTrigger className="mr-2" />
              <div className="flex-1">
                <Header />
              </div>
            </div>
          </header>
        )}
        
        <div className="flex flex-1 w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}