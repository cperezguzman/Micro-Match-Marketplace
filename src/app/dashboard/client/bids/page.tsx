"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { BidCard, Bid } from "@/components/ui/bid-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";

// Mock user data
const mockUser = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  role: "client" as const,
  avatar: "/avatars/john.jpg",
};

// Mock bids data
const mockBids: Bid[] = [
  {
    id: "bid1",
    projectId: "project1",
    contributor: {
      id: "contributor1",
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      rating: 4.8,
      skills: ["React Native", "JavaScript", "Firebase", "Stripe API"],
    },
    amount: 12000,
    currency: "USD",
    timeline: "6 weeks",
    proposal: "I have 5+ years of experience in React Native development and have built similar e-commerce apps. I can deliver a high-quality, scalable solution within your timeline. My approach includes proper testing, code documentation, and post-launch support.",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "bid2",
    projectId: "project1",
    contributor: {
      id: "contributor2",
      name: "Mike Chen",
      avatar: "/avatars/mike.jpg",
      rating: 4.9,
      skills: ["React Native", "TypeScript", "Node.js", "MongoDB"],
    },
    amount: 15000,
    currency: "USD",
    timeline: "8 weeks",
    proposal: "I specialize in React Native apps with complex backend integrations. I'll provide a comprehensive solution with real-time features, secure payment processing, and admin dashboard. I'm available for ongoing maintenance.",
    status: "pending",
    createdAt: "2024-01-14T15:45:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "bid3",
    projectId: "project2",
    contributor: {
      id: "contributor3",
      name: "Emily Rodriguez",
      avatar: "/avatars/emily.jpg",
      rating: 4.7,
      skills: ["Logo Design", "Branding", "Adobe Illustrator", "Photoshop"],
    },
    amount: 1500,
    currency: "USD",
    timeline: "1 week",
    proposal: "I'll create a modern, minimalist logo that perfectly represents your AI analytics platform. I'll provide multiple concepts and unlimited revisions until you're completely satisfied.",
    status: "accepted",
    createdAt: "2024-01-10T09:20:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
  },
  {
    id: "bid4",
    projectId: "project3",
    contributor: {
      id: "contributor4",
      name: "David Kim",
      avatar: "/avatars/david.jpg",
      rating: 4.6,
      skills: ["Python", "Streamlit", "Data Visualization", "Pandas"],
    },
    amount: 5000,
    currency: "USD",
    timeline: "3 weeks",
    proposal: "I'll build an interactive dashboard with real-time data updates, custom charts, and export functionality. The dashboard will be responsive and include user authentication.",
    status: "rejected",
    createdAt: "2024-01-08T11:15:00Z",
    updatedAt: "2024-01-10T16:45:00Z",
  },
];

export default function ClientBidsPage() {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const pendingBids = mockBids.filter(bid => bid.status === "pending");
  const acceptedBids = mockBids.filter(bid => bid.status === "accepted");
  const rejectedBids = mockBids.filter(bid => bid.status === "rejected");

  const handleAcceptBid = (bidId: string) => {
    const bid = mockBids.find(b => b.id === bidId);
    if (bid) {
      setSelectedBid(bid);
      setShowAcceptDialog(true);
    }
  };

  const handleRejectBid = (bidId: string) => {
    const bid = mockBids.find(b => b.id === bidId);
    if (bid) {
      setSelectedBid(bid);
      setShowRejectDialog(true);
    }
  };

  const handleMessage = (bidId: string) => {
    console.log("Open message thread for bid:", bidId);
  };

  const confirmAcceptBid = () => {
    console.log("Accepting bid:", selectedBid?.id);
    setShowAcceptDialog(false);
    setSelectedBid(null);
  };

  const confirmRejectBid = () => {
    console.log("Rejecting bid:", selectedBid?.id);
    setShowRejectDialog(false);
    setSelectedBid(null);
  };

  return (
    <MainLayout user={mockUser}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Bids</h1>
          <p className="text-gray-600">
            Review and manage bids for your projects
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bids</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBids.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting your review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted Bids</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{acceptedBids.length}</div>
              <p className="text-xs text-muted-foreground">
                Projects in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected Bids</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedBids.length}</div>
              <p className="text-xs text-muted-foreground">
                Not selected
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bids Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingBids.length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Accepted ({acceptedBids.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Rejected ({rejectedBids.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingBids.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending bids</h3>
                  <p className="text-gray-600">You don't have any pending bids to review.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingBids.map((bid) => (
                  <BidCard
                    key={bid.id}
                    bid={bid}
                    onAccept={handleAcceptBid}
                    onReject={handleRejectBid}
                    onMessage={handleMessage}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {acceptedBids.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No accepted bids</h3>
                  <p className="text-gray-600">You haven't accepted any bids yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {acceptedBids.map((bid) => (
                  <BidCard
                    key={bid.id}
                    bid={bid}
                    showActions={false}
                    onMessage={handleMessage}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedBids.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <XCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No rejected bids</h3>
                  <p className="text-gray-600">You haven't rejected any bids.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {rejectedBids.map((bid) => (
                  <BidCard
                    key={bid.id}
                    bid={bid}
                    showActions={false}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Accept Bid Dialog */}
        <Dialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accept Bid</DialogTitle>
              <DialogDescription>
                Are you sure you want to accept this bid? This will start the project with the selected contributor.
              </DialogDescription>
            </DialogHeader>
            {selectedBid && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">Bid Details</h4>
                  <p className="text-sm text-green-700 mt-1">
                    <strong>{selectedBid.contributor.name}</strong> - ${selectedBid.amount.toLocaleString()} - {selectedBid.timeline}
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAcceptDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={confirmAcceptBid}>
                    Accept Bid
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reject Bid Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Bid</DialogTitle>
              <DialogDescription>
                Are you sure you want to reject this bid? The contributor will be notified.
              </DialogDescription>
            </DialogHeader>
            {selectedBid && (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-900">Bid Details</h4>
                  <p className="text-sm text-red-700 mt-1">
                    <strong>{selectedBid.contributor.name}</strong> - ${selectedBid.amount.toLocaleString()} - {selectedBid.timeline}
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={confirmRejectBid}>
                    Reject Bid
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
