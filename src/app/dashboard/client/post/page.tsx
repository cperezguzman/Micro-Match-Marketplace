"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, DollarSign, Calendar, Clock } from "lucide-react";

// Mock user data
const mockUser = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  role: "client" as const,
  avatar: "/avatars/john.jpg",
};

const commonSkills = [
  "React", "JavaScript", "Python", "Node.js", "TypeScript", "Vue.js",
  "Angular", "PHP", "Laravel", "Django", "Flask", "Express.js",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Docker", "AWS",
  "UI/UX Design", "Figma", "Adobe XD", "Sketch", "Photoshop",
  "Mobile Development", "React Native", "Flutter", "iOS", "Android",
  "Machine Learning", "Data Science", "TensorFlow", "PyTorch",
  "DevOps", "CI/CD", "Kubernetes", "Jenkins", "Git"
];

export default function PostProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budgetMin: "",
    budgetMax: "",
    currency: "USD",
    deadline: "",
    projectType: "short_term",
    location: "",
    skills: [] as string[],
  });

  const [newSkill, setNewSkill] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Project posted:", formData);
    // Handle project posting logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill),
    });
  };

  const handleSkillInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(newSkill);
    }
  };

  return (
    <MainLayout user={mockUser}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Post a New Project</h1>
          <p className="text-gray-600">
            Describe your project and find the perfect contributor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Provide basic information about your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., React Native Mobile App Development"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project in detail. Include requirements, goals, and any specific features needed..."
                  rows={6}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="short_term">Short Term (1-4 weeks)</option>
                    <option value="long_term">Long Term (1+ months)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Remote, New York, London"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Budget & Timeline
              </CardTitle>
              <CardDescription>
                Set your budget range and project deadline
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budgetMin">Minimum Budget</Label>
                  <div className="relative">
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm border-none bg-transparent focus:outline-none"
                    >
                      <option value="USD">$</option>
                      <option value="EUR">€</option>
                      <option value="GBP">£</option>
                    </select>
                    <Input
                      id="budgetMin"
                      name="budgetMin"
                      type="number"
                      value={formData.budgetMin}
                      onChange={handleChange}
                      placeholder="1000"
                      className="pl-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetMax">Maximum Budget</Label>
                  <div className="relative">
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm border-none bg-transparent focus:outline-none"
                    >
                      <option value="USD">$</option>
                      <option value="EUR">€</option>
                      <option value="GBP">£</option>
                    </select>
                    <Input
                      id="budgetMax"
                      name="budgetMax"
                      type="number"
                      value={formData.budgetMax}
                      onChange={handleChange}
                      placeholder="5000"
                      className="pl-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
              <CardDescription>
                Specify the skills and technologies needed for this project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Skills */}
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Add Skill Input */}
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleSkillInputKeyPress}
                  placeholder="Add a skill..."
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addSkill(newSkill)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Common Skills */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Common Skills
                </Label>
                <div className="flex flex-wrap gap-2">
                  {commonSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                      onClick={() => addSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              Post Project
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
