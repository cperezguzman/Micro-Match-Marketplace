// src/pages/ContributorAssignmentsPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ContributorAssignmentsPage() {
  const navigate = useNavigate();

  // TEMP MOCK DATA – replace with backend fetch later
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Mobile App UI Redesign",
      summary:
        "Create UI screens, interactions, and handoff assets for the new mobile app redesign.",
      client: "@UXCorp",
      projectId: "#1042",
      milestones: [
        { id: 1, title: "Wireframes", due: "Oct 15, 2025", progress: 100 },
        { id: 2, title: "Prototype", due: "Oct 21, 2025", progress: 60 },
        { id: 3, title: "Final UI Delivery", due: "Oct 30, 2025", progress: 25 },
      ],
    },
    {
      id: 2,
      title: "E-Commerce Recommendation Engine",
      summary:
        "Develop personalized product ranking and ML models for dashboard integration.",
      client: "@DataWizard",
      projectId: "#2078",
      milestones: [
        { id: 1, title: "Dataset Cleaning", due: "Nov 12, 2025", progress: 100 },
        { id: 2, title: "Model Training", due: "Nov 22, 2025", progress: 40 },
        { id: 3, title: "Integration", due: "Dec 2, 2025", progress: 10 },
      ],
    },
  ]);

  const [openProjectId, setOpenProjectId] = useState(null);
  const toggleProject = (id) =>
    setOpenProjectId((prev) => (prev === id ? null : id));

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 flex justify-center">
      <div className="w-full max-w-[1200px] px-20 py-16 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">My Assignments</h1>
          <p className="text-gray-600">
            View your assigned projects and submit milestone deliverables.
          </p>
        </div>

        {/* Project List */}
        {projects.map((project) => {
          const isOpen = openProjectId === project.id;

          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 cursor-pointer transition hover:shadow-md"
              onClick={() => toggleProject(project.id)}
            >
              {/* Summary */}
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

              <div className="text-sm mt-4">
                <p className="font-medium text-gray-800">Client:</p>
                <p className="text-blue-600">{project.client}</p>
              </div>

              {/* Accordion */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-[1000px] mt-10" : "max-h-0"
                }`}
              >
                <h2 className="text-xl font-semibold mb-6">Milestones</h2>

                <div className="space-y-5">
                  {project.milestones.map((m) => (
                    <div
                      key={m.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/milestone-submit/${project.id}/${m.id}`);
                      }}
                      className="border border-gray-200 rounded-lg p-5 space-y-2 bg-gray-50 cursor-pointer hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{m.title}</h3>
                        <span className="text-sm text-gray-500">Due: {m.due}</span>
                      </div>

                      {/* PROGRESS BAR — EXACT CLIENT LOGIC */}
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            m.progress === 100
                              ? "bg-green-500"
                              : m.progress >= 50
                              ? "bg-yellow-400"
                              : m.progress > 0
                              ? "bg-blue-500"
                              : "bg-gray-400"
                          }`}
                          style={{ width: `${m.progress}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{m.progress}% Complete</span>

                        {/* EXACT STATUS COLORS — MATCHING CLIENT */}
                        {m.progress === 100 ? (
                          <span className="text-green-600 font-medium">Completed</span>
                        ) : m.progress >= 50 ? (
                          <span className="text-yellow-600 font-medium">In Progress</span>
                        ) : m.progress > 0 ? (
                          <span className="text-blue-600 font-medium">In Progress</span>
                        ) : (
                          <span className="text-gray-500 font-medium">Not Started</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                  <button className="border border-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                    Contact Client
                  </button>

                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    View Project Chat
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Back Button */}
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
