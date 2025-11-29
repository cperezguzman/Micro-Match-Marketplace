// src/pages/BrowsingPage.jsx
import React, { useState } from "react";
import { Search, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const mockProjects = [
  {
    id: "1",
    title: "React Native Mobile App Development",
    description:
      "Looking for an experienced React Native developer to build a cross-platform mobile app for our startup.",
    client: {
      name: "Sarah Johnson",
      initials: "SJ",
      rating: 4.8,
    },
    budget: "$5,000 – $15,000",
    dueDate: "Feb 15, 2024",
    postedDate: "Jan 10, 2024",
    location: "Remote",
    bids: 12,
    tags: ["React Native", "JavaScript", "Firebase"],
    type: "long term",
  },
  {
    id: "2",
    title: "Logo Design for Tech Startup",
    description:
      "Need a modern, minimalist logo design for our AI-powered analytics platform.",
    client: { name: "Mike Chen", initials: "MC", rating: 4.9 },
    budget: "$500 – $2,000",
    dueDate: "Jan 25, 2024",
    postedDate: "Jan 8, 2024",
    location: "Remote",
    bids: 8,
    tags: ["Logo Design", "Adobe Illustrator", "Branding"],
    type: "short term",
  },
  {
    id: "3",
    title: "AI Resume Enhancer Tool",
    description:
      "Build a web tool that uses GPT to analyze and improve resumes with tailored suggestions for job seekers.",
    client: { name: "Karen Thompson", initials: "KT", rating: 4.8 },
    budget: "$1,000 – $4,000",
    dueDate: "Feb 28, 2024",
    postedDate: "Posted Jan 16, 2024",
    location: "Remote",
    bids: 10,
    tags: ["GPT", "NLP", "Resume Parser"],
    type: "short term",
  },
  {
    id: "4",
    title: "VR Physics Simulation for Education",
    description:
      "Create an interactive VR module to teach high school students about motion, energy, and force using immersive visuals.",
    client: { name: "Alexei Lebedev", initials: "AL", rating: 4.9 },
    budget: "$10,000 – $30,000",
    dueDate: "Mar 10, 2024",
    postedDate: "Posted Jan 17, 2024",
    location: "Remote",
    bids: 5,
    tags: ["Unity", "VR", "C#", "Physics Engine"],
    type: "long term",
  },
];

function Tag({ children }) {
  return (
    <span className="text-xs bg-gray-100 text-gray-800 rounded px-2 py-1">
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const label = status === "long term" ? "Long Term" : "Short Term";
  const color =
    status === "long term"
      ? "bg-purple-100 text-purple-700"
      : "bg-yellow-100 text-yellow-700";
  return (
    <span className={`text-xs rounded px-2 py-1 ${color}`}>{label}</span>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 text-sm truncate w-2/3">
          {project.title}
        </h3>
        <div className="flex gap-1">
          <span className="text-green-700 text-xs bg-green-100 rounded px-2 py-1">
            open
          </span>
          <StatusBadge status={project.type} />
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-snug line-clamp-2 mb-3">
        {project.description}
      </p>
      <div className="flex items-center text-sm text-gray-700 mb-2">
        <span className="font-medium mr-1">{project.client.initials}</span>{" "}
        {project.client.name} ★ {project.client.rating}
      </div>
      <div className="text-sm text-gray-500 mb-2">{project.budget}</div>
      <div className="text-sm text-gray-500 mb-2">Due {project.dueDate}</div>
      <div className="text-sm text-gray-500 mb-2">{project.location}</div>
      <div className="text-sm text-gray-500 mb-2">{project.bids} bids</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {project.tags.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-2">
        Posted {project.postedDate}
      </p>
      <Link to="/place-bid">
        <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Submit Bid
        </button>
      </Link>
    </div>
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = mockProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold">Project Marketplace</h1>
        <p className="text-sm text-gray-600">
          Discover exciting projects and showcase your skills
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-white border rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm font-semibold text-gray-700">
            <Search className="w-4 h-4 mr-2" /> Search Projects
          </div>
          <button className="flex items-center text-sm text-gray-700 border rounded px-3 py-1 hover:bg-gray-100">
            <SlidersHorizontal className="w-4 h-4 mr-1" /> Filters
          </button>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          placeholder="Search projects by title or description..."
        />
      </div>

      {/* Header / Controls */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold">{filteredProjects.length} Projects Found</h2>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
          <option>Newest</option>
          <option>Deadline</option>
          <option>Budget</option>
          <option>Most Bids</option>
        </select>
      </div>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <button
        onClick={() => navigate("/dashboard")}
        className="fixed bottom-6 left-6 flex items-center gap-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 shadow-sm transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>
    </div>
  );
}