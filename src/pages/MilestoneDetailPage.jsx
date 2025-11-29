"use client";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function MilestoneDetailPage() {
  const navigate = useNavigate();
  const { projectId, milestoneId } = useParams();

  // ---- Sample dataset (matches your AssignmentPage structure) ----

  // Temporary project dataset just for milestone detail page.
  // NOTE: When backend is ready, remove this and fetch the project instead.
  const projectData = {
    1: {
      id: 1,
      title: "Mobile App UI Redesign",
      contributor: "@SchemaSquad",
      milestones: {
        1: { id: 1, title: "Wireframe Draft", due: "Oct 15, 2025", status: "Completed" },
        2: { id: 2, title: "Prototype Review", due: "Oct 21, 2025", status: "Pending Review" },
        3: { id: 3, title: "Final Delivery", due: "Oct 30, 2025", status: "In Progress" }
      }
    },
    2: {
      id: 2,
      title: "E-Commerce Product Recommendation Engine",
      contributor: "@DataWizard",
      milestones: {
        1: { id: 1, title: "Dataset Cleaning & Prep", due: "Nov 12, 2025", status: "Completed" },
        2: { id: 2, title: "Model Training & Benchmarking", due: "Nov 22, 2025", status: "In Progress" },
        3: { id: 3, title: "Integration with Dashboard", due: "Dec 2, 2025", status: "In Progress" }
      }
    }
  };

  // You can edit these freely without touching AssignmentPage.jsx.
  // Later, when backend is ready, you will replace this with an API call.
  const deliverablesByMilestoneId = {
    1: [
      { id: 1, name: "High-Fidelity Wireframes (Figma)", status: "Approved" },
      { id: 2, name: "Wireframe Screens (Mobile + Desktop)", status: "Approved" },
      { id: 3, name: "UX Flowchart", status: "In Progress" },
    ],

    2: [
      { id: 1, name: "Clickable Prototype", status: "Pending Review" },
      { id: 2, name: "Interaction Notes & Transitions", status: "Pending Review" },
      { id: 3, name: "Prototype Usability Checklist", status: "In Progress" },
    ],

    3: [
      { id: 1, name: "Final UI Screens", status: "In Progress" },
      { id: 2, name: "Design System Export", status: "In Progress" },
      { id: 3, name: "Dev Handoff Assets", status: "Not Started" },
    ],

    // fallback for milestones that don't have custom deliverables yet
    default: [
      { id: 1, name: "No deliverables defined for this milestone.", status: "Pending" }
    ]
  };

// -------------------------------------------------------------
// BACKEND IMPLEMENTATION NOTE — CUSTOM DELIVERABLES
// -------------------------------------------------------------
//
// This file currently uses a local map (deliverablesByMilestoneId)
// for demonstration. When the backend is live, REMOVE ALL LOCAL DATA.
//
// Replace with a real fetch:
//
//   GET /api/projects/:projectId/milestones/:milestoneId
//
// Expected response shape:
//
// {
//   id,
//   title,
//   due,
//   status,
//   deliverables: [
//     { id, name, status },
//     ...
//   ]
// }
//
// Then set:
//   const deliverables = data.deliverables;
//
// These deliverables come directly from CreateProject → backend,
// meaning deliverables are fully customizable per milestone.
// -------------------------------------------------------------


  // ===== USE CORRECT DELIVERABLE LIST =====
  const deliverables = (deliverablesByMilestoneId[milestoneId] || deliverablesByMilestoneId.default);

  // ---- Get correct project + milestone ----
  const project = projectData[projectId];
  const milestone = project?.milestones[milestoneId];

  if (!project || !milestone) {
    navigate("/error");
    return
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 flex justify-center">
      <div className="w-full max-w-[1200px] px-20 py-16 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{milestone.title}</h1>
          <p className="text-gray-600">
            Review deliverables, provide feedback, and approve or return this milestone.
          </p>
        </div>

        {/* Summary */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-600 mt-2">
                Milestone: {milestone.title}
              </p>
            </div>
            <div className="text-sm text-gray-500">Due: {milestone.due}</div>
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <p className="font-medium text-gray-800">Contributor:</p>
              <p className="text-blue-600">{project.contributor}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">Status:</p>
              <p className={
                milestone.status === "Completed" ? "text-green-600" :
                milestone.status === "Pending Review" ? "text-yellow-600" :
                "text-blue-600"
              }>
                {milestone.status}
              </p>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Deliverables</h2>

          <div className="space-y-4">
            {deliverables.map((d) => (
              <div
                key={d.id}
                className="flex justify-between items-center border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <span className="font-medium">{d.name}</span>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    d.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : d.status === "Pending Review"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-xl font-semibold">Reviewer Comments</h2>
          <textarea
            placeholder="Leave feedback or notes for the contributor..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 -mt-2">
          <button className="border border-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Return for Changes
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Approve Milestone
          </button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 underline text-blue-600 text-sm"
        >
          Back to Assignment
        </button>

      </div>
      <button
        onClick={() => navigate("/assignment")}
        className="fixed bottom-6 left-6 flex items-center gap-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 shadow-sm transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Project Assignments
      </button>
    </div>
  );
}
