"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, MessageSquare, Send, Calendar, User, Star } from "lucide-react";

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

interface Contributor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  rating: number;
  skills: string[];
  completedProjects: number;
  totalEarned: number;
}

interface BidFormData {
  amount: string;
  deliveryDays: string;
  message: string;
  timeline: string;
  approach: string;
}

interface PlaceBidModalProps {
  project: Project;
  contributor?: Contributor;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (bidData: BidFormData) => void;
}

// Mock contributor data
const defaultContributor: Contributor = {
  id: "contributor1",
  name: "Chris Johnson",
  email: "chris@example.com",
  avatar: "/avatars/chris.jpg",
  rating: 4.9,
  skills: ["React Native", "JavaScript", "TypeScript", "Firebase", "Node.js"],
  completedProjects: 25,
  totalEarned: 45000,
};

export function PlaceBidModal({ 
  project, 
  contributor = defaultContributor,
  isOpen, 
  onClose, 
  onSubmit 
}: PlaceBidModalProps) {
  const [formData, setFormData] = useState<BidFormData>({
    amount: "",
    deliveryDays: "",
    message: "",
    timeline: "",
    approach: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BidFormData>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validation
    const newErrors: Partial<BidFormData> = {};
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.deliveryDays) newErrors.deliveryDays = "Delivery timeline is required";
    if (!formData.message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Bid submitted:", formData);
    
    if (onSubmit) {
      onSubmit(formData);
    }

    // Reset form
    setFormData({
      amount: "",
      deliveryDays: "",
      message: "",
      timeline: "",
      approach: "",
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof BidFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateDailyRate = () => {
    const amount = parseFloat(formData.amount);
    const days = parseFloat(formData.deliveryDays);
    if (amount && days) {
      return formatCurrency(amount / days, project.budget.currency);
    }
    return "";
  };

  const isWithinBudget = () => {
    const amount = parseFloat(formData.amount);
    return amount >= project.budget.min && amount <= project.budget.max;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Place Your Bid
          </DialogTitle>
          <DialogDescription>
            Submit your proposal for this project
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Project Information */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>Budget Range</span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(project.budget.min, project.budget.currency)} - {formatCurrency(project.budget.max, project.budget.currency)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Deadline</span>
                  </div>
                  <span className="font-medium">
                    {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Project Type</span>
                  </div>
                  <Badge variant="outline">
                    {project.type === "short_term" ? "Short Term" : "Long Term"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>Current Bids</span>
                  </div>
                  <span className="font-medium">{project.bidsCount}</span>
                </div>

                {/* Client Info */}
                <div className="pt-3 border-t">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{project.client.name}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-xs text-gray-600">{project.client.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{contributor.name}</p>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">{contributor.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Completed Projects:</span>
                    <p className="font-medium">{contributor.completedProjects}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Earned:</span>
                    <p className="font-medium">{formatCurrency(contributor.totalEarned, "USD")}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Your Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {contributor.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bid Form */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Bid</CardTitle>
                <CardDescription>
                  Fill in your proposal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Your Bid Amount ({project.budget.currency}) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="5000"
                        className="pl-10"
                        required
                      />
                    </div>
                    {errors.amount && (
                      <p className="text-sm text-red-600">{errors.amount}</p>
                    )}
                    {formData.amount && !isWithinBudget() && (
                      <p className="text-sm text-orange-600">
                        Amount is outside the project budget range
                      </p>
                    )}
                  </div>

                  {/* Delivery Timeline */}
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDays">Delivery Timeline (Days) *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="deliveryDays"
                        name="deliveryDays"
                        type="number"
                        value={formData.deliveryDays}
                        onChange={handleChange}
                        placeholder="30"
                        className="pl-10"
                        required
                      />
                    </div>
                    {errors.deliveryDays && (
                      <p className="text-sm text-red-600">{errors.deliveryDays}</p>
                    )}
                    {formData.amount && formData.deliveryDays && (
                      <p className="text-sm text-gray-600">
                        Daily rate: {calculateDailyRate()}
                      </p>
                    )}
                  </div>

                  {/* Timeline Description */}
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline Breakdown</Label>
                    <Textarea
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      placeholder="e.g., Week 1: Setup and planning, Week 2-3: Core development, Week 4: Testing and deployment"
                      rows={3}
                    />
                  </div>

                  {/* Approach */}
                  <div className="space-y-2">
                    <Label htmlFor="approach">Your Approach</Label>
                    <Textarea
                      id="approach"
                      name="approach"
                      value={formData.approach}
                      onChange={handleChange}
                      placeholder="Describe your methodology, tools, and approach for this project..."
                      rows={3}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message to Client *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write a compelling message explaining why you're the best fit for this project..."
                      rows={4}
                      required
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="min-w-[120px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Bid
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">💡 Tips for a Great Bid</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Be specific about your approach and methodology</p>
                <p>• Highlight relevant experience and skills</p>
                <p>• Provide a realistic timeline with milestones</p>
                <p>• Show enthusiasm and understanding of the project</p>
                <p>• Ask clarifying questions if needed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
