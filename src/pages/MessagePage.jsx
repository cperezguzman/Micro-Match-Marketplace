import React, { useState, useRef } from "react";
import { Paperclip, Send, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MessagePage() {
  const navigate = useNavigate();

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Chris (Client)",
      lastMessage: "Can you share the latest mockups?",
      project: "Landing page polish",
      unread: 2,
      messages: [
        { sender: "Chris", text: "Can you share the latest mockups and timeline?", time: "10:41 AM" },
        { sender: "Me", text: "Uploading now. Also pushed components to Figma.", files: [{ name: "header-v2.fig" }], time: "10:43 AM" },
      ],
    },
    {
      id: 2,
      name: "Jason (PM)",
      lastMessage: "Milestone 2 approved.",
      project: "Workflow Tool",
      unread: 0,
      messages: [{ sender: "Jason", text: "Milestone 2 approved.", time: "11:00 AM" }],
    },
    {
      id: 3,
      name: "Carlos (Dev)",
      lastMessage: "Pushed a hotfix to repo.",
      project: "Backend Patch",
      unread: 1,
      messages: [{ sender: "Carlos", text: "Pushed a hotfix to repo.", time: "2:05 PM" }],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  // --- Send message ---
  const handleSend = () => {
    if (newMessage.trim() === "" && attachedFiles.length === 0) return;

    const updatedChats = chats.map((chat) =>
      chat.id === activeChatId
        ? {
            ...chat,
            messages: [
              ...chat.messages,
              {
                sender: "Me",
                text: newMessage.trim(),
                files: attachedFiles.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })),
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ],
          }
        : chat
    );

    setChats(updatedChats);
    setNewMessage("");
    setAttachedFiles([]);
  };

  // --- Handle Enter ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- File attach logic ---
  const handleAttachClick = () => fileInputRef.current.click();
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setAttachedFiles((prev) => [...prev, ...newFiles]);
    e.target.value = null;
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside className="w-80 border-r border-gray-200 bg-gray-50 p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`p-4 text-left rounded-xl transition ${
                chat.id === activeChatId
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-white hover:bg-gray-100 border border-transparent"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{chat.name}</span>
                {chat.unread > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                    {chat.unread}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </aside>

      {/* Chat Section */}
      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-lg">{activeChat.name}</h3>
            <p className="text-sm text-gray-500">Project: {activeChat.project}</p>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeChat.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "Me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md p-4 rounded-2xl ${
                  msg.sender === "Me" ? "bg-blue-50 text-gray-800" : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.files?.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {msg.files.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        download={file.name}
                        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm text-blue-600 hover:underline"
                      >
                        <Paperclip className="w-4 h-4" />
                        {file.name}
                      </a>
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2 text-right">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200 p-4 flex flex-col gap-3">
          {/* File Preview Section */}
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {attachedFiles.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-lg px-3 py-1 text-sm"
                >
                  <Paperclip className="w-4 h-4 text-blue-500" />
                  <span className="truncate max-w-[120px]">{file.name}</span>
                  <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleAttachClick}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Attach files"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a message..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
