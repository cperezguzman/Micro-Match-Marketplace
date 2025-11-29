"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AssignmentPage() {
  const navigate = useNavigate();

// -------------------------------------------------------------
// DATA FLOW NOTE — MILESTONES & DELIVERABLES FROM BACKEND
// -------------------------------------------------------------
//
// In the future, this local "projects" array will be replaced
// with a real backend fetch:
//
//   GET /api/projects
//
// Each project will include:
//   • project metadata
//   • milestones[] (each with id, title, due, progress)
//   • deliverables[] inside each milestone
//
// AssignmentPage.jsx will NOT define milestones manually.
// It will simply render whatever project.milestones[] the
// backend returns.
//
// Clicking a milestone entry will route to:
//   /milestone/:projectId/:milestoneId
//
// …where MilestoneDetailPage.jsx fetches the full milestone
// including its custom deliverables.
// -------------------------------------------------------------

  const projects = [
    {
      id: 1,
      title: "Mobile App UI Redesign",
      summary:
        "Redesign the mobile app interface to enhance user experience and accessibility. Deliverables include wireframes, prototypes, and developer handoff assets.",
      contributor: "@SchemaSquad",
      projectId: "#1042",
      status: "In Progress",
      milestones: [
        { id: 1, title: "Wireframe Draft", due: "Oct 15, 2025", progress: 100 },
        { id: 2, title: "Prototype Review", due: "Oct 21, 2025", progress: 70 },
        { id: 3, title: "Final Delivery", due: "Oct 30, 2025", progress: 30 },
      ],
    },

    {
      id: 2,
      title: "E-Commerce Product Recommendation Engine",
      summary:
          "Build a machine-learning powered recommendation engine that analyzes user behavior and provides personalized product suggestions. Includes dashboard integration and performance analytics.",
      contributor: "@DataWizard",
      projectId: "#2078",
      status: "In Progress",
      milestones: [
          { id: 1, title: "Dataset Cleaning & Prep", due: "Nov 12, 2025", progress: 100 },
          { id: 2, title: "Model Training & Benchmarking", due: "Nov 22, 2025", progress: 60 },
          { id: 3, title: "Integration with Dashboard", due: "Dec 2, 2025", progress: 20 },
      ],
    },

    {
      id: 3,
      title: "Marketing Analytics Dashboard",
      summary:
          "Develop an interactive analytics dashboard for tracking campaign performance, ROAS, customer acquisition metrics, and multi-channel engagement. Includes exportable reports and role-based access.",
      contributor: "@InsightDev",
      projectId: "#3510",
      status: "In Progress",
      milestones: [
          { id: 1, title: "UI Wireframes", due: "Oct 28, 2025", progress: 100 },
          { id: 2, title: "Backend Aggregation Pipeline", due: "Nov 5, 2025", progress: 40 },
          { id: 3, title: "Dashboard Visualizations", due: "Nov 18, 2025", progress: 10 },
      ],
    },

    {
      id: 4,
      title: "AI-Powered Resume Screening Tool",
      summary:
          "Create an AI tool that evaluates resumes based on skill matching, experience relevance, and job-specific criteria. Includes PDF parsing, score explanations, and recruiter review workflow.",
      contributor: "@HRTechPro",
      projectId: "#4921",
      status: "In Progress",
      milestones: [
          { id: 1, title: "Resume Parsing Engine", due: "Dec 1, 2025", progress: 80 },
          { id: 2, title: "Ranking Algorithm", due: "Dec 10, 2025", progress: 45 },
          { id: 3, title: "Recruiter Review UI", due: "Dec 20, 2025", progress: 15 },
      ],
    },
    {
      id: 5,
      title: "Customer Support Chatbot Deployment",
      summary:
          "Deploy an AI-driven customer support chatbot with multilingual support, analytics dashboard, and seamless website integration.",
      contributor: "@ConversioAI",
      projectId: "#5814",
      status: "Ready for Finalization",
      milestones: [
          { id: 1, title: "Conversation Flow Design", due: "Sep 10, 2025", progress: 100 },
          { id: 2, title: "Model Training & Tuning", due: "Sep 18, 2025", progress: 100 },
          { id: 3, title: "Website Integration", due: "Sep 25, 2025", progress: 100 },
      ],
    }


    // Add more projects if you want more containers
  ];

  const [openProjectId, setOpenProjectId] = useState(null);

  const toggleProject = (id) => {
    setOpenProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 flex justify-center">
      <div className="w-full max-w-[1200px] px-20 py-16 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Project Assignments</h1>
          <p className="text-gray-600">
            View project details, assigned contributor, and track milestone progress.
          </p>
        </div>

        {/* Project Containers */}
        {projects.map((project) => {
          const isOpen = openProjectId === project.id;

          const allMilestonesComplete = (
            Array.isArray(project.milestones) &&
            project.milestones.length > 0 &&
            project.milestones.every(m => Number(m.progress) === 100));


          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 cursor-pointer transition hover:shadow-md"
              onClick={() => toggleProject(project.id)}
            >
              {/* Top Summary (ALWAYS visible) */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                  <p className="text-gray-600 mt-2">{project.summary}</p>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Project ID:</p>
                  <p className="font-medium text-gray-700">{project.projectId}</p>
                </div>
              </div>

              <div className="flex justify-between text-sm mt-4">
                <div>
                  <p className="font-medium text-gray-800">Assigned Contributor:</p>
                  <p className="text-blue-600">{project.contributor}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">Status:</p>
                  <p className="text-green-600">{project.status}</p>
                </div>
              </div>

              {/* Accordion Section (Milestones) */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-[1000px] mt-10" : "max-h-0"
                }`}
              >
                {/* Milestones */}
                <h2 className="text-xl font-semibold mb-6">Milestones</h2>

                <div className="space-y-5">
                  {project.milestones.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => navigate(`/milestone/${project.id}/${m.id}`)}
                      className="border border-gray-200 rounded-lg p-5 space-y-2 bg-gray-50 cursor-pointer hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{m.title}</h3>
                        <span className="text-sm text-gray-500">Due: {m.due}</span>
                      </div>

                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            m.progress === 100
                              ? "bg-green-500"
                              : m.progress >= 50
                              ? "bg-yellow-400"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${m.progress}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{m.progress}% Complete</span>
                        {m.progress === 100 ? (
                          <span className="text-green-600 font-medium">Completed</span>
                        ) : (
                          <span className="text-yellow-600 font-medium">In Progress</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-8">

                  {/* Request Changes is ALWAYS visible */}
                  <button className="border border-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                    Request Changes
                  </button>

                  {/* Case 1: NOT all milestones complete → show Approve Project */}
                  {!allMilestonesComplete && (
                    <button 
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                      Approve Project
                    </button>
                  )}

                  {/* Case 2: ALL milestones complete → show Finalize Project */}
                  {allMilestonesComplete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/finalize/${project.id}`);
                      }}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                      Finalize Project
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
