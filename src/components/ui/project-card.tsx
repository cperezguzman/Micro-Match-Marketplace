"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, DollarSign, Users, Calendar, MapPin } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  deadline: string;
  skills: string[];
  client: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  status: "open" | "in_progress" | "completed" | "cancelled";
  bidsCount: number;
  createdAt: string;
  location?: string;
  type: "short_term" | "long_term";
}

interface ProjectCardProps {
  project: Project;
  showClientInfo?: boolean;
  onBidClick?: (projectId: string) => void;
}

export function ProjectCard({ project, showClientInfo = true, onBidClick }: ProjectCardProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "short_term":
        return "bg-yellow-100 text-yellow-800";
      case "long_term":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">
              <Link 
                href={`/projects/${project.id}`}
                className="hover:text-primary transition-colors"
              >
                {project.title}
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-2 mb-3">
              {project.description}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <Badge className={getStatusColor(project.status)}>
              {project.status.replace("_", " ")}
            </Badge>
            <Badge variant="outline" className={getTypeColor(project.type)}>
              {project.type.replace("_", " ")}
            </Badge>
          </div>
        </div>

        {showClientInfo && (
          <div className="flex items-center space-x-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={project.client.avatar} alt={project.client.name} />
              <AvatarFallback className="text-xs">
                {project.client.name.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">{project.client.name}</span>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">★</span>
              <span className="text-sm text-gray-600 ml-1">{project.client.rating}</span>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Budget */}
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>
              {formatCurrency(project.budget.min, project.budget.currency)} - {formatCurrency(project.budget.max, project.budget.currency)}
            </span>
          </div>

          {/* Deadline */}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Due {formatDate(project.deadline)}</span>
          </div>

          {/* Location */}
          {project.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{project.location}</span>
            </div>
          )}

          {/* Bids Count */}
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{project.bidsCount} bids</span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1">
            {project.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {project.skills.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.skills.length - 3} more
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3">
            <div className="text-xs text-gray-500">
              Posted {formatDate(project.createdAt)}
            </div>
            {onBidClick && project.status === "open" && (
              <Button 
                size="sm" 
                onClick={() => onBidClick(project.id)}
                className="ml-auto"
              >
                Submit Bid
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
