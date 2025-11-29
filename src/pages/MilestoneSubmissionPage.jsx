// src/pages/MilestoneSubmitPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, FileText } from "lucide-react";

export default function MilestoneSubmitPage() {
  const navigate = useNavigate();
  const { projectId, milestoneId } = useParams();

  const [milestone, setMilestone] = useState(null);

  // File uploads stored per-deliverable
  const [deliverableFiles, setDeliverableFiles] = useState({});

  // Notes and loading state
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Accordion open state
  const [openDeliverable, setOpenDeliverable] = useState(null);

  const toggleDeliverable = (id) => {
    setOpenDeliverable((prev) => (prev === id ? null : id));
  };

  // Simulated fetch — replace with backend API call later
  useEffect(() => {
    setMilestone({
      id: milestoneId,
      title: "Prototype Delivery",
      description:
        "Upload your clickable Figma prototype and provide any additional project notes.",
      due: "Oct 22, 2025",
      progress: 60,
      deliverables: [
        { id: 1, name: "Prototype Link", required: true },
        { id: 2, name: "Design Explanation", required: false },
        { id: 3, name: "Interaction Notes", required: false },
      ],
    });
  }, [milestoneId]);

  // ----------- Handle submission to backend -----------
  async function handleSubmit() {
    setLoading(true);

    // 1. Upload files PER deliverable
    const uploadedByDeliverable = {};

    for (const deliverableId in deliverableFiles) {
      const files = deliverableFiles[deliverableId];
      if (!files || files.length === 0) continue;

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      // POST /api/uploads
      const uploadRes = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
        headers: {
          // Authorization: `Bearer ${token}`, // use once backend auth is active
        },
      });

      const urls = await uploadRes.json();
      uploadedByDeliverable[deliverableId] = urls;
    }

    // 2. Submit milestone
    await fetch(
      `/api/projects/${projectId}/milestones/${milestoneId}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          notes,
          filesByDeliverable: uploadedByDeliverable,
        }),
      }
    );

    setLoading(false);
    navigate("/contributor-assignments");
  }

  if (!milestone)
    return <div className="p-10 text-center text-gray-600">Loading…</div>;

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[900px] px-10 py-14 space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{milestone.title}</h1>
          <p className="text-gray-600">Due: {milestone.due}</p>
        </div>

        <p className="text-gray-700">{milestone.description}</p>

        {/* ─────────────── Deliverables Accordion ─────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Required Deliverables</h2>

          <ul className="space-y-4">
            {milestone.deliverables.map((d) => {
              const isOpen = openDeliverable === d.id;

              return (
                <li
                  key={d.id}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition"
                  onClick={() => toggleDeliverable(d.id)}
                >
                  {/* Deliverable header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-800">
                        {d.name}
                      </span>

                      {d.required && (
                        <span className="text-xs text-white bg-red-500 px-2 py-1 rounded-md">
                          Required
                        </span>
                      )}
                    </div>

                    <span className="text-gray-400 text-sm">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  {/* Accordion content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-[500px] mt-4" : "max-h-0"
                    }`}
                  >
                    {/* Upload for this deliverable */}
                    <label
                      className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => {
                          const selected = Array.from(e.target.files);

                          setDeliverableFiles((prev) => ({
                            ...prev,
                            [d.id]: prev[d.id]
                              ? [...prev[d.id], ...selected]
                              : [...selected],
                          }));
                        }}
                      />

                      <div className="flex flex-col items-center text-gray-600">
                        <Upload className="w-8 h-8 mb-2" />
                        <p>Upload files for this deliverable</p>
                      </div>
                    </label>

                    {/* File previews */}
                    {deliverableFiles[d.id] &&
                      deliverableFiles[d.id].length > 0 && (
                        <div className="mt-4 space-y-2">
                          {deliverableFiles[d.id].map((file, i) => (
                            <div
                              key={i}
                              className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700"
                            >
                              {file.name}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ─────────────── Additional Notes ─────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-40 border border-gray-300 rounded-xl p-4 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write any relevant details here..."
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Milestone"}
          </button>
        </div>
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-6 left-6 flex items-center gap-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 shadow-sm transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
    </div>
  );
}
