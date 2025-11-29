"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const skills = [
    "UI/UX Design",
    "Prototyping",
    "Figma",
    "React",
    "Wireframing",
    "Accessibility",
  ];

  const reviews = [
    {
      id: 1,
      author: "Dr. Sarah Johnson",
      comment:
        "@Name delivered exceptional design work on our mobile prototype. Clean, consistent, and well-documented!",
      rating: 5,
    },
    {
      id: 2,
      author: "MC Mac Chen",
      comment:
        "Great collaborator and communicator. Responded quickly to feedback and implemented changes efficiently.",
      rating: 5,
    },
  ];

  const portfolio = [
    {
      id: 1,
      title: "Education Platform Dashboard",
      description:
        "UI system for an online learning dashboard, designed for teachers and students.",
      image: "📘",
    },
    {
      id: 2,
      title: "Nonprofit Website Redesign",
      description: "Accessible and responsive site for a local organization.",
      image: "🌱",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 flex justify-center">
      <div className="w-full max-w-[1200px] px-20 py-16 space-y-10">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src="https://i.pravatar.cc/120?img=3"
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-sm"
          />
          <div>
            <h1 className="text-3xl font-bold">@Name</h1>
            <p className="text-gray-600 text-base">UI/UX Designer · New York, NY</p>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-gray-600 leading-relaxed">
            I’m a multidisciplinary designer passionate about creating seamless and accessible
            digital experiences. I focus on usability, visual clarity, and inclusive design
            principles.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs Container */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex gap-6 border-b border-gray-200 pb-4 mb-6">
            <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
              Profile
            </button>
            <button className="text-gray-500 hover:text-blue-600 transition">Reviews</button>
            <button className="text-gray-500 hover:text-blue-600 transition">Portfolio</button>
          </div>

          {/* Content */}
          <div className="space-y-12">

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="border border-gray-200 p-5 rounded-lg bg-gray-50 space-y-2"
                  >
                    <p className="text-gray-700">“{r.comment}”</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>— {r.author}</span>
                      <span>{"⭐".repeat(r.rating)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
              <div className="grid grid-cols-2 gap-6">
                {portfolio.map((p) => (
                  <div
                    key={p.id}
                    className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="text-4xl mb-3">{p.image}</div>
                    <h3 className="font-medium text-gray-900">{p.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
