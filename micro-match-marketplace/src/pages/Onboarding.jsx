// src/pages/OnboardingWizard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, User, Wrench, Plus, X } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext hook


// Skill-chip UI (same as before)
function SkillChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-sm bg-white">
      <Wrench className="w-3.5 h-3.5 text-blue-600" />
      {label}
      {onRemove && (
        <button onClick={onRemove} className="rounded-full p-0.5 hover:bg-gray-100">
          <X className="w-3.5 h-3.5 text-gray-500" />
        </button>
      )}
    </span>
  );
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);               // "Client" or "Contributor"
  const [skills, setSkills] = useState([]);             // array of skill strings
  const [newSkill, setNewSkill] = useState("");
  const [experience, setExperience] = useState(null); // state for experience level

  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // ✅ access user + setUser from AuthContext

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setNewSkill("");
    }
  };

  const removeSkill = (label) => {
    setSkills((prev) => prev.filter((s) => s !== label));
  };

  // Optionally: you can prevent next-step if conditions not met
  const canProceedFromStep = () => {
    if (step === 1) return role !== null;
    if (step === 2) return skills.length > 0;
    if (step === 3) return experience !== null;
    return true;
  };

  // handle onboarding completion
  const handleFinish = () => {
    if (!role) return alert("Please select a role.");
    if (skills.length === 0) return alert("Please add at least one skill.");
    if (!experience) return alert("Please select experience level.");

    // Update user info in AuthContext
    setUser((prev) => ({
      ...prev,
      activeRole: role, // store as "Client" or "Contributor"
      skills: skills,
      experienceLevel: experience,
      needsOnboarding: false,
    }));

    // Navigate based on chosen role
    navigate("/dashboard");
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white text-gray-900">
      <div className="w-full max-w-4xl p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
        {/* Progress Steps (visual) */}
        <ol className="flex justify-between items-center mb-10 space-x-3">
          {[
            { label: "Choose Role" },
            { label: "Add Skills" },
            { label: "Experience" },
            { label: "Confirm" },
          ].map((s, i) => {
            const idx = i + 1;
            const isActive = step === idx;
            const isDone = step > idx;
            return (
              <li
                key={idx}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 border text-center ${
                  isActive || isDone
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isDone
                      ? "bg-blue-400 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {idx}
                </span>
                <span className="text-sm font-medium">{s.label}</span>
              </li>
            );
          })}
        </ol>

        {/* Render current step */}
        {step === 1 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setRole("Client")}
              className={`text-left p-6 rounded-2xl border transition cursor-pointer ${
                role === "Client"
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-200 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                <BadgeCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Client</h3>
              </div>
              <p className="text-sm text-gray-600">
                Post projects, review bids, manage payments and milestones.
              </p>
            </button>

            <button
              onClick={() => setRole("Contributor")}
              className={`text-left p-6 rounded-2xl border transition cursor-pointer ${
                role === "Contributor"
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-200 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Contributor</h3>
              </div>
              <p className="text-sm text-gray-600">
                Find work, place bids, deliver milestones, and earn.
              </p>
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="rounded-2xl border border-gray-200 p-6 mb-8">
            <h4 className="font-semibold mb-4">Add Skills</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((s) => (
                <SkillChip key={s} label={s} onRemove={() => removeSkill(s)} />
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Type a skill and press Add"
              />
              <button
                onClick={addSkill}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="rounded-2xl border border-gray-200 p-6 mb-8">
            <h4 className="font-semibold mb-4">Select Experience Level</h4>
            <div className="flex flex-col gap-3">
              {["Student / Junior", "Intermediate", "Senior / Experienced"].map((exp) => (
                <label key={exp} className="flex items-center gap-2 p-4 border rounded-xl hover:border-blue-400 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value={exp}
                    checked={experience === exp}
                    onChange={() => setExperience(exp)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{exp}</span>
                </label>
              ))}
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="rounded-2xl border border-gray-200 p-6 mb-8">
            <h4 className="font-semibold mb-4">Confirm Selection</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500 mb-1">Role</p>
                <p className="font-medium">{role || "—"}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500 mb-1">Primary Skills</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skills.map((s) => (
                    <SkillChip key={s} label={s} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500 mb-1">Experience Level</p>
                <p className="font-medium">{experience || "—"}</p>
              </div>
            </div>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-end gap-3">
          {step > 1 && (
            <button
              onClick={back}
              className="border border-gray-300 text-gray-800 px-6 py-3 rounded-xl text-md font-medium hover:bg-gray-100 transition"
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              onClick={next}
              disabled={!canProceedFromStep()}
              className={`px-6 py-3 rounded-xl text-md font-medium flex items-center gap-2 transition ${
                canProceedFromStep()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {step === 4 && (
            <button
              onClick={handleFinish}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-md font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
              Finish
            </button>
          )}
        </div>
      </div>
      <button
        onClick={() => navigate("/register")}
        className="fixed bottom-6 left-6 flex items-center gap-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 shadow-sm transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Registration
      </button>
    </div>
  );
}
