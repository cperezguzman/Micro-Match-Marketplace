"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, X, DollarSign, Calendar, Clock, Upload, FileText, Image, Paperclip } from "lucide-react";

// Mock user data
const mockUser = {
  id: "user1",
  name: "Chris Johnson",
  email: "chris@example.com",
  role: "client" as "client" | "contributor" | "admin",
  avatar: "/avatars/chris.jpg",
};

const commonSkills = [
  "React", "JavaScript", "Python", "Node.js", "TypeScript", "Vue.js",
  "Angular", "PHP", "Laravel", "Django", "Flask", "Express.js",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Docker", "AWS",
  "UI/UX Design", "Figma", "Adobe XD", "Sketch", "Photoshop",
  "Mobile Development", "React Native", "Flutter", "iOS", "Android",
  "Machine Learning", "Data Science", "TensorFlow", "PyTorch",
  "DevOps", "CI/CD", "Kubernetes", "Jenkins", "Git", "Web Design",
  "Logo Design", "Branding", "Graphic Design", "Illustration"
];

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export default function CreateProjectPage() {
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
    attachments: [] as Attachment[],
  });

  const [newSkill, setNewSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Project created:", formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      budgetMin: "",
      budgetMax: "",
      currency: "USD",
      deadline: "",
      projectType: "short_term",
      location: "",
      skills: [],
      attachments: [],
    });
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments: Attachment[] = Array.from(files).map((file, index) => ({
        id: `attachment-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));

      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...newAttachments],
      });
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter(a => a.id !== attachmentId),
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (type.includes('pdf')) return <FileText className="h-4 w-4" />;
    return <Paperclip className="h-4 w-4" />;
  };

  const isFormValid = () => {
    return formData.title && 
           formData.description && 
           formData.budgetMin && 
           formData.budgetMax && 
           formData.deadline &&
           formData.skills.length > 0;
  };

  return (
    <MainLayout user={mockUser}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
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
                <Label htmlFor="title">Project Title *</Label>
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
                <Label htmlFor="description">Project Description *</Label>
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

          {/* Budget & Timeline */}
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
                  <Label htmlFor="budgetMin">Minimum Budget *</Label>
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
                  <Label htmlFor="budgetMax">Maximum Budget *</Label>
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
                  <Label htmlFor="deadline">Deadline *</Label>
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
              <CardTitle>Required Skills *</CardTitle>
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

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Project Attachments
              </CardTitle>
              <CardDescription>
                Upload any relevant files, images, or documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-sm font-medium text-primary hover:text-primary/80">
                    Click to upload files
                  </span>
                  <span className="text-sm text-gray-500"> or drag and drop</span>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt,.zip"
                />
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, PDF, DOC, TXT, ZIP up to 10MB each
                </p>
              </div>

              {/* Attachments List */}
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
                  {formData.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(attachment.type)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(attachment.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              
              <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">
                    Preview Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Project Preview</DialogTitle>
                    <DialogDescription>
                      Review your project before publishing
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{formData.title || "Project Title"}</h3>
                      <p className="text-gray-600 mt-2">{formData.description || "Project description..."}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Budget:</span> {formData.currency} {formData.budgetMin} - {formData.budgetMax}
                      </div>
                      <div>
                        <span className="font-medium">Deadline:</span> {formData.deadline || "Not set"}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {formData.projectType === "short_term" ? "Short Term" : "Long Term"}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {formData.location || "Not specified"}
                      </div>
                    </div>
                    {formData.skills.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Button 
              type="submit" 
              disabled={!isFormValid() || isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
