"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Briefcase,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  FileText,
  Clock,
  CheckCircle,
  PlusCircle,
  UserCheck,
  Shield,
} from "lucide-react";

interface SidebarProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: "client" | "contributor" | "admin";
  };
}

const getNavigationItems = (role: string) => {
  const baseItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Projects", href: "/projects", icon: Briefcase },
    { name: "Messages", href: "/messages", icon: MessageSquare },
  ];

  switch (role) {
    case "client":
      return [
        ...baseItems,
        { name: "Post Project", href: "/dashboard/client/post", icon: PlusCircle },
        { name: "My Projects", href: "/dashboard/client/projects", icon: FileText },
        { name: "Bids", href: "/dashboard/client/bids", icon: Users },
        { name: "Milestones", href: "/dashboard/client/milestones", icon: Clock },
        { name: "Reviews", href: "/dashboard/client/reviews", icon: UserCheck },
      ];
    case "contributor":
      return [
        ...baseItems,
        { name: "Browse Projects", href: "/dashboard/contributor/browse", icon: Briefcase },
        { name: "My Bids", href: "/dashboard/contributor/bids", icon: FileText },
        { name: "Assignments", href: "/dashboard/contributor/assignments", icon: CheckCircle },
        { name: "Deliverables", href: "/dashboard/contributor/deliverables", icon: Clock },
        { name: "Reviews", href: "/dashboard/contributor/reviews", icon: UserCheck },
      ];
    case "admin":
      return [
        ...baseItems,
        { name: "User Management", href: "/dashboard/admin/users", icon: Users },
        { name: "Project Moderation", href: "/dashboard/admin/projects", icon: Shield },
        { name: "Disputes", href: "/dashboard/admin/disputes", icon: MessageSquare },
        { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
      ];
    default:
      return baseItems;
  }
};

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const navigationItems = user ? getNavigationItems(user.role) : [];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* User Info */}
        {user && (
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function MobileSidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const navigationItems = user ? getNavigationItems(user.role) : [];

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 flex-shrink-0 h-5 w-5",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
