"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlaceBidModal } from "./place-bid-modal";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: { min: number; max: number; currency: string };
  deadline: string;
  skills: string[];
  client: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  status: string;
  bidsCount: number;
  createdAt: string;
  location?: string;
  type: string;
}

interface BidButtonProps {
  project: Project;
  onBidSubmitted?: (projectId: string, bidData: any) => void;
}

export function BidButton({ project, onBidSubmitted }: BidButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBidSubmit = (bidData: any) => {
    console.log("Bid submitted for project:", project.id, bidData);
    if (onBidSubmitted) {
      onBidSubmitted(project.id, bidData);
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        disabled={project.status !== "open"}
        className="w-full"
      >
        Submit Bid
      </Button>

      <PlaceBidModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBidSubmit}
      />
    </>
  );
}
