"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Users, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  PlusCircle,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// Mock user data
const mockUser = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  role: "client" as "client" | "contributor" | "admin",
  avatar: "/avatars/john.jpg",
};

export default function DashboardPage() {
  const user = mockUser;

  const getRoleSpecificContent = () => {
    switch (user.role) {
      case "client":
        return (
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/dashboard/client/post">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Post New Project
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/client/bids">
                      <Users className="h-4 w-4 mr-2" />
                      Review Bids
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/client/projects">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Manage Projects
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Currently in progress
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$25,000</div>
                  <p className="text-xs text-muted-foreground">
                    Across all projects
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Bids</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting review
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "contributor":
        return (
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your work and find new opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/dashboard/contributor/browse">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Browse Projects
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/contributor/assignments">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      My Assignments
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/contributor/bids">
                      <Users className="h-4 w-4 mr-2" />
                      My Bids
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bids</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">
                    +5 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Accepted Bids</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    53% success rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$18,000</div>
                  <p className="text-xs text-muted-foreground">
                    Lifetime earnings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    Currently working on
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "admin":
        return (
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
                <CardDescription>Manage the platform and resolve issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/dashboard/admin/users">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/admin/disputes">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Resolve Disputes
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/admin/analytics">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Analytics
                    </Link>
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
                  <div className="text-2xl font-bold">1,250</div>
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
                  <div className="text-2xl font-bold">45</div>
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
                  <div className="text-2xl font-bold">$150,000</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Disputes Resolved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getRecentActivity = () => {
    switch (user.role) {
      case "client":
        return [
          {
            id: "1",
            type: "bid_received",
            title: "New bid received",
            description: "Sarah Johnson submitted a bid for React Native App project",
            time: "2 hours ago",
          },
          {
            id: "2",
            type: "project_completed",
            title: "Project completed",
            description: "Logo Design project has been completed successfully",
            time: "1 day ago",
          },
        ];
      case "contributor":
        return [
          {
            id: "1",
            type: "bid_accepted",
            title: "Bid accepted",
            description: "Your bid for Data Analysis Dashboard was accepted",
            time: "3 hours ago",
          },
          {
            id: "2",
            type: "milestone_due",
            title: "Milestone due soon",
            description: "React Native App - Phase 1 is due in 2 days",
            time: "5 hours ago",
          },
        ];
      case "admin":
        return [
          {
            id: "1",
            type: "user_registered",
            title: "New user registered",
            description: "Mike Chen registered as a contributor",
            time: "1 hour ago",
          },
          {
            id: "2",
            type: "dispute_resolved",
            title: "Dispute resolved",
            description: "Payment dispute between Sarah and John has been resolved",
            time: "3 hours ago",
          },
        ];
      default:
        return [];
    }
  };

  const recentActivity = getRecentActivity();

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your {user.role} account today.
          </p>
        </div>

        {/* Role-specific content */}
        {getRoleSpecificContent()}

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    {(activity.type === "bid_received" || activity.type === "user_registered") && <Users className="h-5 w-5 text-blue-500" />}
                    {(activity.type === "bid_accepted" || activity.type === "project_completed" || activity.type === "dispute_resolved") && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {activity.type === "milestone_due" && <Clock className="h-5 w-5 text-orange-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}