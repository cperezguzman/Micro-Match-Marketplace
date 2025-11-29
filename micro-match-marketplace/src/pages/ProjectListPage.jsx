import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useRoleTheme from "../hooks/useRoleTheme";
import { ArrowLeft } from "lucide-react"; 

// Dummy current user name for Contributor
const currentUser = "Lina K.";

const allProjects = [
  {
    id: "1",
    title: "AI‑Powered Research Assistant",
    budget: 1800,
    bids: [
      { id: 1, contributor: "Nora A.", amount: 1400 },
      { id: 2, contributor: "Rami S.", amount: 1600 },
      { id: 3, contributor: "Lina K.", amount: 1300 }, // current user
    ],
  },
  {
    id: "2",
    title: "Mobile Shopping App",
    budget: 12000,
    bids: [],
  },
  {
    id: "3",
    title: "Website Redesign & SEO",
    budget: 4500,
    bids: [],
  },
];

export default function ProjectListPage() {
  const { role } = useRoleTheme();
  const navigate = useNavigate();

  const filteredProjects =
    role === "Client"
      ? allProjects
      : allProjects.filter((p) =>
          p.bids?.some((b) => b.contributor === currentUser)
        );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {role === "Client" ? "Projects Posted" : "My Bids"}
      </h1>

      <div className="space-y-4">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{proj.title}</h2>
            <div className="text-sm text-gray-600 mb-4">
              Budget: ${proj.budget}
            </div>
            <Link
              to={`/project-details/${proj.id}`}
              className="inline-block text-blue-600 hover:underline font-medium"
            >
              View Details →
            </Link>
          </div>
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
