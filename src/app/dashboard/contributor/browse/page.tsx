"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { ProjectCard, Project } from "@/components/ui/project-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Filter, SlidersHorizontal, DollarSign, Clock } from "lucide-react";

// Mock user data
const mockUser = {
  id: "contributor1",
  name: "Sarah Johnson",
  email: "sarah@example.com",
  role: "contributor" as const,
  avatar: "/avatars/sarah.jpg",
};

// Mock projects data
const mockProjects: Project[] = [
  {
    id: "1",
    title: "React Native Mobile App Development",
    description: "Looking for an experienced React Native developer to build a cross-platform mobile app for our startup. The app should include user authentication, real-time chat, and payment integration.",
    budget: { min: 5000, max: 15000, currency: "USD" },
    deadline: "2024-02-15",
    skills: ["React Native", "JavaScript", "Firebase", "Stripe API"],
    client: {
      id: "client1",
      name: "John Doe",
      avatar: "/avatars/john.jpg",
      rating: 4.8,
    },
    status: "open",
    bidsCount: 12,
    createdAt: "2024-01-10",
    location: "Remote",
    type: "long_term",
  },
  {
    id: "2",
    title: "Logo Design for Tech Startup",
    description: "Need a modern, minimalist logo design for our AI-powered analytics platform. Looking for clean, professional design that reflects innovation and trust.",
    budget: { min: 500, max: 2000, currency: "USD" },
    deadline: "2024-01-25",
    skills: ["Logo Design", "Adobe Illustrator", "Branding", "Graphic Design"],
    client: {
      id: "client2",
      name: "Mike Chen",
      avatar: "/avatars/mike.jpg",
      rating: 4.9,
    },
    status: "open",
    bidsCount: 8,
    createdAt: "2024-01-08",
    location: "Remote",
    type: "short_term",
  },
  {
    id: "3",
    title: "Data Analysis Dashboard",
    description: "Create an interactive dashboard using Python and Streamlit to visualize sales data. Need someone with experience in data visualization and business intelligence.",
    budget: { min: 2000, max: 8000, currency: "USD" },
    deadline: "2024-02-01",
    skills: ["Python", "Streamlit", "Data Visualization", "Pandas", "Plotly"],
    client: {
      id: "client3",
      name: "Emily Rodriguez",
      avatar: "/avatars/emily.jpg",
      rating: 4.7,
    },
    status: "open",
    bidsCount: 15,
    createdAt: "2024-01-12",
    location: "Remote",
    type: "short_term",
  },
];

const skillFilters = [
  "React Native", "JavaScript", "Python", "Machine Learning", "Web Design",
  "Mobile Development", "Data Science", "UI/UX", "Backend Development", "DevOps"
];

const budgetRanges = [
  { label: "Under $1,000", min: 0, max: 1000 },
  { label: "$1,000 - $5,000", min: 1000, max: 5000 },
  { label: "$5,000 - $10,000", min: 5000, max: 10000 },
  { label: "$10,000+", min: 10000, max: Infinity },
];

export default function BrowseProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<string>("");
  const [projectType, setProjectType] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [bidData, setBidData] = useState({
    amount: "",
    timeline: "",
    proposal: "",
  });

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => project.skills.includes(skill));
    
    const matchesBudget = !selectedBudgetRange || (() => {
      const range = budgetRanges.find(range => range.label === selectedBudgetRange);
      return range ? range.min <= project.budget.max && range.max >= project.budget.min : false;
    })();
    
    const matchesType = !projectType || project.type === projectType;

    return matchesSearch && matchesSkills && matchesBudget && matchesType;
  });

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleBidClick = (projectId: string) => {
    const project = mockProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setShowBidDialog(true);
    }
  };

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting bid:", {
      projectId: selectedProject?.id,
      ...bidData,
    });
    setShowBidDialog(false);
    setSelectedProject(null);
    setBidData({ amount: "", timeline: "", proposal: "" });
  };

  const handleBidDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBidData({
      ...bidData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MainLayout user={mockUser}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Projects</h1>
          <p className="text-gray-600">
            Find projects that match your skills and interests
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Search Projects
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="space-y-4 pt-4 border-t">
                {/* Skills Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillFilters.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Budget Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Budget Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((range) => (
                      <Badge
                        key={range.label}
                        variant={selectedBudgetRange === range.label ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedBudgetRange(
                          selectedBudgetRange === range.label ? "" : range.label
                        )}
                      >
                        {range.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Type Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Project Type</h3>
                  <div className="flex gap-2">
                    <Badge
                      variant={projectType === "short_term" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setProjectType(
                        projectType === "short_term" ? "" : "short_term"
                      )}
                    >
                      Short Term
                    </Badge>
                    <Badge
                      variant={projectType === "long_term" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setProjectType(
                        projectType === "long_term" ? "" : "long_term"
                      )}
                    >
                      Long Term
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredProjects.length} Projects Found
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option value="newest">Newest</option>
                <option value="deadline">Deadline</option>
                <option value="budget">Budget</option>
                <option value="bids">Most Bids</option>
              </select>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onBidClick={handleBidClick}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium">No projects found</h3>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSkills([]);
                  setSelectedBudgetRange("");
                  setProjectType("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Bid Dialog */}
        <Dialog open={showBidDialog} onOpenChange={setShowBidDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Your Bid</DialogTitle>
              <DialogDescription>
                Submit your proposal for this project
              </DialogDescription>
            </DialogHeader>
            
            {selectedProject && (
              <div className="space-y-6">
                {/* Project Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedProject.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {selectedProject.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>
                          ${selectedProject.budget.min.toLocaleString()} - ${selectedProject.budget.max.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Due {new Date(selectedProject.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bid Form */}
                <form onSubmit={handleSubmitBid} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Your Bid Amount ($)</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={bidData.amount}
                        onChange={handleBidDataChange}
                        placeholder="5000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <Input
                        id="timeline"
                        name="timeline"
                        value={bidData.timeline}
                        onChange={handleBidDataChange}
                        placeholder="e.g., 4 weeks"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proposal">Your Proposal</Label>
                    <Textarea
                      id="proposal"
                      name="proposal"
                      value={bidData.proposal}
                      onChange={handleBidDataChange}
                      placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowBidDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Submit Bid
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
