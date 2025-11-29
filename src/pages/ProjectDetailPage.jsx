import { format, isToday, isThisWeek, parseISO } from "date-fns";
import {
  Check,
  Users,
  ScrollText,
  BadgeCheck,
  MessageSquare,
  ChevronRight,
  Send,
  Pencil,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useRoleTheme from "../hooks/useRoleTheme";
import { useAuth } from "../context/AuthContext";


// Sample projects data (should match ids from list page)
const allProjects = [
  {
    id: 1,
    title: "AI‑Powered Research Assistant",
    status: "Open",
    budget: 1800,
    skills: ["Python", "React", "NLP", "PostgreSQL", "Figma"],
    summary:
      "Build a micro‑tool that parses PDFs, extracts key figures/tables, and generates structured notes with citations. Integrate with a simple web UI and export.",
    scope: [
      "Document ingestion + parsing (PDF/HTML)",
      "Entity + citation extraction",
      "Minimal React UI (upload + results)",
      "Export CSV + Notion page",
    ],
    bids: [
      { id: 1, contributor: "Nora A.", amount: 1400, eta: "7 days", note: "Reliable parsing + UI." },
      { id: 2, contributor: "Rami S.", amount: 1600, eta: "10 days", note: "Robust table extraction." },
      { id: 3, contributor: "Lina K.", amount: 1300, eta: "8 days", note: "UX + citations export." },
    ],
    messages: [
      { id: 1, sender: "Client", text: "Clarify citation formats?", time: "2025-11-18T10:12:00" },
      { id: 2, sender: "Lina", text: "IEEE or APA—either works. Prefer IEEE?", time: "2025-11-18T10:20:00" },
    ],
    activity: [
      { id: 1, text: "Project posted", time: "Oct 8, 2025" },
      { id: 2, text: "3 bids received", time: "Oct 9, 2025" },
      { id: 3, text: "Client updated scope", time: "Oct 11, 2025" },
    ],
  },
  // Additional projects can be added here
];

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { role, isClient } = useRoleTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Find project before using hooks
  const project = allProjects.find((p) => p.id.toString() === projectId);


  const [active, setActive] = useState(isClient ? "Overview" : "Edit Bid");
  const [localProject, setLocalProject] = useState(project); // replace 'initialProjectData' with your actual data
  const [acceptedBidId, setAcceptedBidId] = useState(null);

  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

  const handleAcceptBid = (bidId) => {
  // TODO: In future, update database with accepted bid

  const accepted = localProject.bids.find(bid => bid.id === bidId);
  if (!accepted) return;

  setLocalProject({ 
    ...localProject, 
    bids: [accepted],
    status: "In Progress", // Updated project status here
    acceptedBidId: bidId
   }); // Keep only the accepted bid
  setAcceptedBidId(bidId);

  console.log("Accepted bid:", bidId);
  // navigate("/dashboard");
  };

  const handleDeclineBid = (bidId) => {
    const updatedBids = localProject.bids.filter(bid => bid.id !== bidId);
    setLocalProject({ ...localProject, bids: updatedBids });
  // TODO: In future, update database with declined bid
  console.log("Declined bid:", bidId);
  };

  function formatMessageTime(isoString) {
    try {
      const date = parseISO(isoString);
      if (isNaN(date)) throw new Error("Invalid date");

      if (isToday(date)) return `Today ${format(date, 'p')}`;
      if (isThisWeek(date)) return format(date, 'EEEE p');
      return format(date, 'MMM d, yyyy p');
    } catch {
      return '';
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-white to-gray-50 text-gray-900 font-sans p-6 md:p-10">
      {/* Header */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">{localProject.title}</h1>
              <StatusBadge 
                status={user?.activeRole === "Contributor" ? "In Progress" : project.status} 
              />
              {/* <StatusBadge status={localProject.status} />
                    This is the way I think it should be when we implement the DB backend
                    For now, the In Progress status will be hard-coded for Contributors */}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-800">${localProject.budget}</span> budget
              </div>
              <div className="flex items-center gap-1"><Users className="w-4 h-4" /> Skills:</div>
              <div className="flex flex-wrap gap-2">
                {localProject.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs border border-blue-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm">
        <Tabs active={active} setActive={setActive} isClient={isClient} />
        <div className="p-6 md:p-8">
          {active === "Overview" && <OverviewTab project={localProject} />}
          {active === "Edit Bid" && !isClient && <EditBidTabContributor project={localProject} />}
          {active === "Bids" && isClient && (
            <BidsTabClient 
              project={localProject} 
              handleAcceptBid={handleAcceptBid} 
              handleDeclineBid={handleDeclineBid}
              acceptedBidId={acceptedBidId} 
              />
          )}
          {active === "Messages" && (
            <MessagesTab 
              project={localProject} 
              formatMessageTime={formatMessageTime}
              />
          )}
          {active === "Activity" && <ActivityTab project={localProject} />}
        </div>
      </div>
      <button
        onClick={() => navigate("/my-bids")}
        className="fixed bottom-6 left-6 flex items-center gap-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 shadow-sm transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Posted Projects
      </button>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Open: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
    Completed: "bg-blue-50 text-blue-700 border-blue-200",
    "On Hold": "bg-gray-100 text-gray-600 border-gray-200",
  };
  return <span className={`text-xs px-2.5 py-1 rounded-full border ${map[status] || map.Open}`}>{status}</span>;
}

function Tabs({ active, setActive, isClient }) {
  const items = [
    { name: "Overview", icon: ScrollText },
    ...(isClient 
      ? [{ name: "Bids", icon: BadgeCheck }] 
      : [{ name: "Edit Bid", icon: Pencil }]),
    { name: "Messages", icon: MessageSquare },
    { name: "Activity", icon: ChevronRight },
  ];
  return (
    <div className="flex flex-wrap gap-2 p-2 md:p-3 border-b border-gray-100">
      {items.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => setActive(name)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm md:text-[0.95rem] transition border ${
            active === name
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Icon className="w-4 h-4" /> {name}
        </button>
      ))}
    </div>
  );
}

// function Section({ title, children, icon: Icon }) {
//   return (
//     <div className="mb-6">
//       <div className="flex items-center gap-2 mb-3">
//         {Icon && <Icon className="w-4 h-4 text-gray-500" />}
//         <h3 className="text-base font-semibold text-gray-900">{title}</h3>
//       </div>
//       <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
//     </div>
//   );
// }

function OverviewTab({ project }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-3">Summary</h3>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">{project.summary}</p>
      <h3 className="text-base font-semibold text-gray-900 mb-2">Scope</h3>
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        {project.scope.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </div>
  );
}

function BidsTabClient({ project, acceptedBidId, handleAcceptBid, handleDeclineBid }) {
  
  return (
    <div className="space-y-4">
      {project.bids.map((b) => (
        <div key={b.id} className="border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="font-semibold text-gray-900">{b.contributor}</div>
            <div className="text-sm text-gray-600">
              Bid: <span className="font-medium text-gray-800">${b.amount}</span> • ETA: {b.eta}
            </div>
            <div className="text-sm text-gray-700 mt-1">{b.note}</div>
          </div>
          <div className="flex gap-3">
            {acceptedBidId === b.id ? (
              <span className="bg-green-100 text-green-800 px-4 py-2.5 rounded-xl text-sm font-medium border border-green-200">
                Accepted
              </span>
            ) : (
              <>
                <button 
                    onClick={() => handleAcceptBid(b.id)} 
                    className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2">
                  <Check className="w-4 h-4" /> Accept
                </button>
                <button 
                  onClick={() => handleDeclineBid(b.id)} 
                  className="border border-gray-300 text-gray-800 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition">
                  Decline
                </button>
              </> 
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function EditBidTabContributor() {
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700">Your Bid</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input className="border p-3 rounded-xl" defaultValue="1400" />
        <input className="border p-3 rounded-xl" defaultValue="7 days" />
        <input className="border p-3 rounded-xl" placeholder="Availability" />
      </div>
      <textarea className="w-full border p-3 rounded-xl" placeholder="Notes / approach" rows="4" />
      <div className="flex gap-4 mt-2">
        <button className="bg-white border px-6 py-3 rounded-xl">Update Bid</button>
      </div>
    </div>
  );
}

function MessagesTab({ project, formatMessageTime }) {
  const [messages, setMessages] = useState(project.messages);
  const [newMessageText, setNewMessageText] = useState("");

  const handleSend = () => {
    if (!newMessageText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: newMessageText,
      time: new Date().toISOString(),
    };

    // TODO: Send this message to your backend or database

    setMessages([...messages, newMessage]);
    setNewMessageText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[420px]">
      <div className="flex-1 overflow-auto space-y-3 pr-1">
        {messages.map((m) => (
          <div key={m.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-3">
            <div className="text-xs text-gray-500 mb-1">{m.sender} • {formatMessageTime(m.time)}</div>
            <div className="text-sm text-gray-800">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message…"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
}

function ActivityTab({ project }) {
  return (
    <div className="space-y-4">
      {project.activity.map((a) => (
        <div key={a.id} className="flex items-start gap-3">
          <div className="mt-1 w-2 h-2 rounded-full bg-blue-600" />
          <div>
            <div className="text-sm text-gray-900">{a.text}</div>
            <div className="text-xs text-gray-500">{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}