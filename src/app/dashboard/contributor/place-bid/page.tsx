"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, MessageSquare, Send, Calendar, User, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Mock user data
const mockUser = {
  id: "contributor1",
  name: "Chris Johnson",
  email: "chris@example.com",
  role: "contributor" as "client" | "contributor" | "admin",
  avatar: "/avatars/chris.jpg",
};

// Mock project data
const mockProject = {
  id: "1",
  title: "React Native Mobile App Development",
  description: "Looking for an experienced React Native developer to build a cross-platform mobile app for our startup. The app should include user authentication, real-time chat, and payment integration. We need someone who can work with our existing backend infrastructure and deliver a high-quality, scalable solution.",
  budget: { min: 5000, max: 15000, currency: "USD" },
  deadline: "2024-02-15",
  skills: ["React Native", "JavaScript", "Firebase", "Stripe API", "TypeScript"],
  client: {
    id: "client1",
    name: "Sarah Johnson",
    avatar: "/avatars/sarah.jpg",
    rating: 4.8,
  },
  status: "open",
  bidsCount: 12,
  createdAt: "2024-01-10",
  location: "Remote",
  type: "long_term",
};

interface BidFormData {
  amount: string;
  deliveryDays: string;
  message: string;
  timeline: string;
  approach: string;
}

export default function PlaceBidPage() {
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
    
    // Reset form
    setFormData({
      amount: "",
      deliveryDays: "",
      message: "",
      timeline: "",
      approach: "",
    });

    setIsSubmitting(false);
    
    // Redirect to projects page or show success message
    window.location.href = "/dashboard/contributor/browse";
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
      return formatCurrency(amount / days, mockProject.budget.currency);
    }
    return "";
  };

  const isWithinBudget = () => {
    const amount = parseFloat(formData.amount);
    return amount >= mockProject.budget.min && amount <= mockProject.budget.max;
  };

  return (
    <MainLayout user={mockUser}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/contributor/browse">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900">Place Your Bid</h1>
            <p className="text-gray-600">Submit your proposal for this project</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Project Information - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{mockProject.title}</CardTitle>
                <CardDescription className="text-sm">
                  {mockProject.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>Budget Range</span>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(mockProject.budget.min, mockProject.budget.currency)} - {formatCurrency(mockProject.budget.max, mockProject.budget.currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Deadline</span>
                    </div>
                    <span className="font-medium">
                      {new Date(mockProject.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Project Type</span>
                    </div>
                    <Badge variant="outline">
                      {mockProject.type === "short_term" ? "Short Term" : "Long Term"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span>Current Bids</span>
                    </div>
                    <span className="font-medium">{mockProject.bidsCount}</span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Client Information</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{mockProject.client.name}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{mockProject.client.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockProject.skills.map((skill) => (
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
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{mockUser.name}</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">4.9 rating</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Completed Projects:</span>
                    <p className="font-medium text-lg">25</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Earned:</span>
                    <p className="font-medium text-lg">{formatCurrency(45000, "USD")}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Your Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {["React Native", "JavaScript", "TypeScript", "Firebase", "Node.js"].map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
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

          {/* Bid Form - Right Column */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Bid Proposal</CardTitle>
                <CardDescription>
                  Fill in your proposal details to submit your bid
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-base font-medium">
                      Your Bid Amount ({mockProject.budget.currency}) *
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="5000"
                        className="pl-12 h-12 text-lg"
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
                    <Label htmlFor="deliveryDays" className="text-base font-medium">
                      Delivery Timeline (Days) *
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="deliveryDays"
                        name="deliveryDays"
                        type="number"
                        value={formData.deliveryDays}
                        onChange={handleChange}
                        placeholder="30"
                        className="pl-12 h-12 text-lg"
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
                    <Label htmlFor="timeline" className="text-base font-medium">
                      Timeline Breakdown
                    </Label>
                    <Textarea
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      placeholder="e.g., Week 1: Setup and planning, Week 2-3: Core development, Week 4: Testing and deployment"
                      rows={4}
                      className="text-base"
                    />
                  </div>

                  {/* Approach */}
                  <div className="space-y-2">
                    <Label htmlFor="approach" className="text-base font-medium">
                      Your Approach & Methodology
                    </Label>
                    <Textarea
                      id="approach"
                      name="approach"
                      value={formData.approach}
                      onChange={handleChange}
                      placeholder="Describe your methodology, tools, and approach for this project..."
                      rows={4}
                      className="text-base"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-medium">
                      Message to Client *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write a compelling message explaining why you're the best fit for this project..."
                      rows={5}
                      className="text-base"
                      required
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      asChild
                    >
                      <Link href="/dashboard/contributor/browse">Cancel</Link>
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      size="lg"
                      className="min-w-[160px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="h-5 w-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Submit Bid
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}