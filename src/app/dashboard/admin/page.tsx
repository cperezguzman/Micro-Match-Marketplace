"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Shield,
  MessageSquare
} from "lucide-react";

// Mock user data
const mockUser = {
  id: "admin1",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin" as const,
  avatar: "/avatars/admin.jpg",
};

// Mock admin data
const adminStats = {
  totalUsers: 1250,
  activeUsers: 1100,
  suspendedUsers: 15,
  totalProjects: 450,
  activeProjects: 45,
  completedProjects: 380,
  totalRevenue: 150000,
  disputesResolved: 12,
  pendingDisputes: 3,
};

const recentUsers = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "client",
    status: "active",
    joinDate: "2024-01-15",
    avatar: "/avatars/john.jpg",
  },
  {
    id: "user2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "contributor",
    status: "active",
    joinDate: "2024-01-14",
    avatar: "/avatars/sarah.jpg",
  },
  {
    id: "user3",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "client",
    status: "suspended",
    joinDate: "2024-01-10",
    avatar: "/avatars/mike.jpg",
  },
];

const recentDisputes = [
  {
    id: "dispute1",
    projectId: "project1",
    clientName: "John Doe",
    contributorName: "Sarah Johnson",
    issue: "Payment dispute",
    status: "pending",
    createdAt: "2024-01-15",
  },
  {
    id: "dispute2",
    projectId: "project2",
    clientName: "Mike Chen",
    contributorName: "Emily Rodriguez",
    issue: "Quality concerns",
    status: "resolved",
    createdAt: "2024-01-12",
  },
];

export default function AdminPanelPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout user={mockUser}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">
            Manage users, projects, and platform operations
          </p>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="/dashboard/admin/users">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/dashboard/admin/projects">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Moderate Projects
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/dashboard/admin/disputes">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Resolve Disputes
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/dashboard/admin/analytics">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +50 this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.activeProjects}</div>
              <p className="text-xs text-muted-foreground">
                Across the platform
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Disputes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.pendingDisputes}</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recent Users
              </CardTitle>
              <CardDescription>
                Latest user registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All Users
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Disputes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Recent Disputes
              </CardTitle>
              <CardDescription>
                Latest dispute reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDisputes.map((dispute) => (
                  <div key={dispute.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{dispute.issue}</p>
                      <p className="text-xs text-gray-500">
                        {dispute.clientName} vs {dispute.contributorName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Project #{dispute.projectId}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(dispute.status)}>
                        {dispute.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All Disputes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Platform Health
            </CardTitle>
            <CardDescription>
              System status and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-green-900">System Status</p>
                  <p className="text-xs text-green-700">All systems operational</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Performance</p>
                  <p className="text-xs text-blue-700">99.9% uptime</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Support Tickets</p>
                  <p className="text-xs text-yellow-700">3 pending</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
