// src/components/SidebarTab.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SidebarTab({ label, to, badge, amber = false, blue = false, isButton = false }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses =
    "block rounded-lg px-4 py-2 text-sm font-medium transition flex items-center justify-between";

  // Button-style tabs (Create Project / Browse Projects)
  if (isButton) {
    const buttonClasses = blue
      ? "bg-blue-600 text-white hover:bg-blue-700 mt-4"
      : "bg-amber-500 text-white hover:bg-amber-600 mt-4";

    return (
      <Link to={to} className={`${baseClasses} ${buttonClasses}`}>
        {label}
      </Link>
    );
  }

  // default background for inactive tabs
  const defaultContainer =
    "bg-gray-50 border border-gray-200 text-gray-700";

  // Active tab styling (unchanged)
  const activeClasses = amber
    ? "bg-amber-100 text-amber-700 border border-amber-300"
    : "bg-blue-100 text-blue-700 border border-blue-300";

  // Hover styling (unchanged)
  const hoverClasses = amber
    ? "hover:bg-amber-200"
    : "hover:bg-blue-200";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${
        isActive ? activeClasses : `${defaultContainer} ${hoverClasses}`
      }`}
    >
      <span>{label}</span>

      {badge && (
        <span className="text-xs bg-red-600 text-white rounded-full px-2 py-0.5 ml-2">
          {badge}
        </span>
      )}
    </Link>
  );
}
