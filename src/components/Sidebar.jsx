// src/components/Sidebar.jsx
import React from 'react';
import SidebarTab from './SidebarTab';

export default function Sidebar() {
  return (
    <div className="p-6 bg-white h-full flex flex-col justify-between border-r border-gray-100">
      {/* Top section with logo and tabs */}
      <div>
        <h1 className="text-2xl font-bold mb-8 text-blue-600">Micro-Match</h1>
        
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col gap-2">
            <SidebarTab label="Dashboard" to="/dashboard" />
            <SidebarTab label="My Projects" to="/my-projects" />
            <SidebarTab label="Project Details" to="/project-details" /> {/* ✅ New tab */}
            <SidebarTab label="Assignments" to="/assignments" />
          </div>
        </div>
      </div>

      {/* Bottom section with create project button */}
      <div>
        <SidebarTab
          label="Create Project"
          to="/create-project"
          blue
          isButton
        />
      </div>
    </div>
  );
}
