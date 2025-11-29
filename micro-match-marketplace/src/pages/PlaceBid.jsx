// src/pages/PlaceBid.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlaceBid() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    deliveryDays: "",
    message: "",
    timeline: "",
    approach: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send formData to backend or context
    console.log("Submitted bid:", formData);
    // Optionally navigate back or to a confirmation page
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 text-sm hover:underline flex items-center"
        >
          ← Back to Projects
        </button>
        <div className="text-right">
          <h1 className="text-3xl font-bold">Place Your Bid</h1>
          <p className="text-gray-500 text-sm">
            Submit your proposal for this project
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">
              React Native Mobile App
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Build a cross-platform mobile app with authentication, chat, and
              payments.
            </p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>💵 Budget: $5,000 - $15,000</p>
              <p>📅 Deadline: Feb 15, 2024</p>
              <p>🕒 Type: Long Term</p>
              <p>📈 Current Bids: 12</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-2 text-sm text-gray-700">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                "React Native",
                "JavaScript",
                "Firebase",
                "Stripe API",
                "TypeScript",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-gray-200 rounded-md text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-2 text-sm text-gray-700">💡 Tips</h3>
            <ul className="text-sm text-gray-600 list-disc ml-4 space-y-1">
              <li>Be specific about your approach</li>
              <li>Highlight relevant experience</li>
              <li>Provide realistic timelines</li>
              <li>Show enthusiasm</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Your Bid Proposal</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Bid Amount (USD) *
              </label>
              <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="7000"
                type="number"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Delivery Timeline (Days) *
              </label>
              <input
                name="deliveryDays"
                value={formData.deliveryDays}
                onChange={handleChange}
                placeholder="30"
                type="number"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Timeline Breakdown
              </label>
              <textarea
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="Week 1: Setup, Week 2‑3: Development..."
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Approach & Methodology
              </label>
              <textarea
                name="approach"
                value={formData.approach}
                onChange={handleChange}
                placeholder="Describe your approach..."
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message to Client *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Why are you the best fit?"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-200 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Submit Bid
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
