import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

// Helper function to read sidebar state from cookie
const getSidebarStateFromCookie = (): boolean => {
  if (typeof document === 'undefined') return true; // Default to open on server
  
  const cookies = document.cookie.split(';');
  const sidebarCookie = cookies.find(cookie => 
    cookie.trim().startsWith('sidebar:state=')
  );
  
  if (sidebarCookie) {
    const value = sidebarCookie.split('=')[1];
    return value === 'true';
  }
  
  return true; // Default to open if no cookie found
};

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load sidebar state from cookie on mount
  useEffect(() => {
    const savedState = getSidebarStateFromCookie();
    setSidebarOpen(savedState);
    setIsInitialized(true);
  }, []);

  // Don't render until we've loaded the saved state
  if (!isInitialized) {
    return null;
  }

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}