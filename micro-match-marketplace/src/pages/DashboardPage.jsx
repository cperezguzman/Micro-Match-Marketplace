import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RoleSwitcher from '../components/RoleSwitcher';
import useRoleTheme from '../hooks/useRoleTheme';
import SidebarTab from '../components/SidebarTab';
import { Bell, Clock, MessageCircle } from 'lucide-react';
import { set } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import FloatingProfileButton from "../components/FloatingProfileButton";


export default function DashboardPage() {
  const { user } = useAuth();

  // Example notifications (replace with real data later)
  const notifications = [
    { id: 1, subject: "New bid on your project", time: "2h ago" },
    { id: 2, subject: "Milestone approved", time: "1d ago" },
    { id: 3, subject: "You received a 5★ review", time: "Oct 25" },
  ];

  // Mock deadlines data — replace with real data later
  const mockDeadlines = [
    { id: 1, title: "Project: AI Research Assistant – Submit Proposal", due: "2025-11-05" },
    { id: 2, title: "Milestone: Export to Notion – Delivery", due: "2025-11-12" },
    { id: 3, title: "Bid: New Data Pipeline – Expiration", due: "2025-11-07" },
    { id: 4, title: "Milestone: Lab Workflow Tool – Review", due: "2025-11-09" },
  ];

  // Example mock data (replace with DB fetch later)
  const clientProjects = [
    { id: 1, status: "completed" },
    { id: 2, status: "in-progress" },
    { id: 3, status: "pending" },
    { id: 4, status: "completed" },
  ];

  const contributorBids = [
    { id: 1, status: "completed" },
    { id: 2, status: "in-progress" },
    { id: 3, status: "pending" },
    { id: 4, status: "pending" },
  ];

  const navigate = useNavigate();

  const [unreadMessages, setUnreadMessages] = useState(3); // example unread count

  const isClient = user?.activeRole === 'Client';
  const isContributor = user?.activeRole === 'Contributor';

  const clientStats = computeStats(clientProjects);
  const contributorStats = computeStats(contributorBids);

  // Optional filter: show only deadlines within next N days (or all)
  const [filterDays, setFilterDays] = useState(null); // null = no filter, or e.g. 7

  const deadlines = useMemo(() => {

    // 1) Map to include Date object
    const withDates = mockDeadlines.map((d) => ({
      ...d,
      dueDateObj: parseDueDate(d.due),
    }));

    // 2) Optionally filter
    const now = new Date();
    let filtered = withDates;

    if (filterDays === "overdue") {
      // Show only deadlines before now
      filtered = withDates.filter((d) => d.dueDateObj < now);
    } else if (typeof filterDays === "number") {
      // Show only deadlines within next N days
      const cutoff = new Date(now.getTime() + filterDays * 24 * 60 * 60 * 1000);
      filtered = withDates.filter(
        (d) => d.dueDateObj >= now && d.dueDateObj <= cutoff);
    }

    // 3) Sort ascending by due date (soonest first)
    filtered.sort((a, b) => a.dueDateObj - b.dueDateObj);
    return filtered;
  }, [filterDays]);

  function computeStats(data) {
    const total = data.length;
    const completed = data.filter((d) => d.status === "completed").length;
    const inProgress = data.filter((d) => d.status === "in-progress").length;
    const pending = data.filter((d) => d.status === "pending").length;
    return { total, completed, inProgress, pending };
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function parseDueDate(due) {
    // assume due is YYYY-MM-DD (ISO), parse into Date
    return new Date(due);
  }

  const {
    textColor,
    hoverText,
    bgCTA,
    card1Bg,
    gradientBg,
  } = useRoleTheme();

  return (
    <div className={`flex min-h-screen ${gradientBg}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">Micro-Match</h1>

          {/* Navigation */}
          <nav className="space-y-2">
            {isClient ? (
              <div className="flex flex-col items-start text-left gap-2 pr-4">
                <SidebarTab label="Posted Bids" to ="/bids" blue/>
                <SidebarTab label="Assignments" to="/assignment" blue/>
                <SidebarTab label="Create Project" to="/create-project" blue isButton />
                {/* <a
                  href="/create-project"
                  className="block text-white bg-blue-600 hover:bg-blue-700 text-center px-4 py-2 rounded-lg mt-4"
                >
                  Create Project
                </a> */}
              </div>
            ) : (
              <div className="flex flex-col items-start text-left gap-2 pr-4">
                  <SidebarTab label="My Bids" to="/my-bids" amber />
                  <SidebarTab label="My Assignments" to="/contributor-assignments" amber />
                  <SidebarTab label="Browse Projects" to="/projects" amber isButton />
                  {/* <a
                    href="#"
                    className="block text-white bg-amber-500 hover:bg-amber-600 text-center px-4 py-2 rounded-lg mt-4"
                  >
                    Browse Projects
                  </a> */}
              </div>
            )}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 relative">
        <div className="absolute top-6 right-10">
          <RoleSwitcher />
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {user?.name || 'User'}
          </h2>

          <div className="grid grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className={`p-6 rounded-xl shadow flex flex-col ${
              isClient ? "bg-blue-100" : "bg-yellow-100"
            }`}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isClient ? "text-blue-800" : "text-yellow-800"
                }`}
              >
                {isClient ? "Project Statistics" : "Bid Statistics"}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Completed */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {isClient ? clientStats.completed : contributorStats.completed}
                  </p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>

                {/* In Progress */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {isClient ? clientStats.inProgress : contributorStats.inProgress}
                  </p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>

                {/* Pending */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {isClient ? clientStats.pending : contributorStats.pending}
                  </p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>

                {/* Total */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {isClient ? clientStats.total : contributorStats.total}
                  </p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="p-6 bg-green-100 rounded-xl shadow flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-800" />
                  <h3 className="text-lg font-semibold text-green-800">
                    Upcoming Deadlines
                  </h3>
                </div>

                {/* optional filter UI */}
                <select
                  value={filterDays ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "overdue") setFilterDays("overdue");
                    else setFilterDays(v ? parseInt(v, 10) : null);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                >
                  <option value="">All</option>
                  <option value="7">Next 7d</option>
                  <option value="30">Next 30d</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto max-h-[55vh] pr-1">
                {deadlines.length > 0 ? (
                  deadlines.map((d) => (
                    <div key={d.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow transition">
                      <p className="font-medium text-sm text-gray-800">{d.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {formatDate(d.due)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-6">
                    No upcoming deadlines
                  </p>
                )}
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => navigate("/notifications")}
              className="p-6 bg-orange-100 rounded-xl shadow flex flex-col cursor-pointer hover:bg-orange-200 transition"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-700" />
                  <h3 className="text-lg font-semibold text-orange-800">Notifications</h3>
                </div>
                <p className="text-sm text-gray-700">{notifications.length} total</p>
              </div>

              {/* Notification list */}
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[55vh] pr-1">
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow transition"
                    >
                      <p className="font-medium text-sm text-gray-800">{n.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-6">
                    No new notifications
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="group fixed bottom-6 right-6 z-50">
        <button
          onClick={() => navigate("/messages")}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
              {unreadMessages}
            </span>
          )}
        </button>
        <span className="absolute bottom-14 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition">
          View Messages
        </span>
      </div>
      <FloatingProfileButton />
    </div>
  );
}
