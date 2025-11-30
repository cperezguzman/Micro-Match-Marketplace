"use client";

import { Navbar } from "./navbar";
import { Sidebar, MobileSidebar } from "./sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  user?: {
    id: string;
    name: string;
    email: string;
    role: "client" | "contributor" | "admin";
    avatar?: string;
  };
  showSidebar?: boolean;
}

export function MainLayout({ children, user, showSidebar = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="flex">
        {showSidebar && user && (
          <>
            <Sidebar user={user} />
            <MobileSidebar user={user} />
          </>
        )}
        
        <main className={`flex-1 ${showSidebar && user ? 'md:ml-64' : ''}`}>
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
