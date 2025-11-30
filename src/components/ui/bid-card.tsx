"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, DollarSign, Calendar, MessageSquare } from "lucide-react";

export interface Bid {
  id: string;
  projectId: string;
  contributor: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    skills: string[];
  };
  amount: number;
  currency: string;
  timeline: string;
  proposal: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

interface BidCardProps {
  bid: Bid;
  showActions?: boolean;
  onAccept?: (bidId: string) => void;
  onReject?: (bidId: string) => void;
  onMessage?: (bidId: string) => void;
}

export function BidCard({ bid, showActions = true, onAccept, onReject, onMessage }: BidCardProps) {
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
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={bid.contributor.avatar} alt={bid.contributor.name} />
              <AvatarFallback>
                {bid.contributor.name.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{bid.contributor.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">★</span>
                  <span className="text-sm text-gray-600 ml-1">{bid.contributor.rating}</span>
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {formatDate(bid.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(bid.status)}>
            {bid.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Proposal */}
          <div>
            <p className="text-sm text-gray-700 line-clamp-3">
              {bid.proposal}
            </p>
          </div>

          {/* Bid Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">{formatCurrency(bid.amount, bid.currency)}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span>{bid.timeline}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1">
            {bid.contributor.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {bid.contributor.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{bid.contributor.skills.length - 4} more
              </Badge>
            )}
          </div>

          {/* Actions */}
          {showActions && bid.status === "pending" && (
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMessage?.(bid.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReject?.(bid.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={() => onAccept?.(bid.id)}
                >
                  Accept Bid
                </Button>
              </div>
            </div>
          )}

          {/* Status Actions */}
          {bid.status === "accepted" && (
            <div className="pt-3 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 font-medium">
                  ✓ Bid Accepted
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMessage?.(bid.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Project
                </Button>
              </div>
            </div>
          )}

          {bid.status === "rejected" && (
            <div className="pt-3 border-t">
              <span className="text-sm text-red-600 font-medium">
                ✗ Bid Rejected
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
