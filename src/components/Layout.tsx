import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

// Helper function to read sidebar state from cookie (moved outside component)
const getSidebarStateFromCookie = (): boolean => {
  if (typeof document === 'undefined') return true;
  
  const cookies = document.cookie.split(';');
  const sidebarCookie = cookies.find(cookie => 
    cookie.trim().startsWith('sidebar:state=')
  );
  
  if (sidebarCookie) {
    const value = sidebarCookie.split('=')[1];
    return value === 'true';
  }
  
  return true;
};

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => getSidebarStateFromCookie());

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col overflow-x-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}