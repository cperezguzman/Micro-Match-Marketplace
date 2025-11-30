"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Paperclip, Smile } from "lucide-react";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  type: "text" | "file" | "image";
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

interface MessageThreadProps {
  messages: Message[];
  currentUserId: string;
  onSendMessage?: (content: string) => void;
  onSendFile?: (file: File) => void;
  isLoading?: boolean;
}

export function MessageThread({ 
  messages, 
  currentUserId, 
  onSendMessage, 
  onSendFile, 
  isLoading = false 
}: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSendFile) {
      onSendFile(file);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach((message) => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <Card className="h-[600px] flex flex-col">
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.entries(messageGroups).map(([date, dateMessages]) => (
            <div key={date}>
              {/* Date Separator */}
              <div className="flex items-center justify-center my-4">
                <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {date}
                </div>
              </div>

              {/* Messages for this date */}
              {dateMessages.map((message, index) => {
                const isCurrentUser = message.senderId === currentUserId;
                const showAvatar = index === 0 || dateMessages[index - 1].senderId !== message.senderId;

                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}
                  >
                    <div className={`flex max-w-[70%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar */}
                      {!isCurrentUser && showAvatar && (
                        <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                          <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                          <AvatarFallback className="text-xs">
                            {message.senderName.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      {!isCurrentUser && !showAvatar && (
                        <div className="w-10 mr-2"></div>
                      )}

                      {/* Message Content */}
                      <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                        {!isCurrentUser && showAvatar && (
                          <span className="text-xs text-gray-500 mb-1">{message.senderName}</span>
                        )}
                        
                        <div
                          className={`px-3 py-2 rounded-lg ${
                            isCurrentUser
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>

                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, idx) => (
                              <div
                                key={idx}
                                className={`px-3 py-2 rounded-lg border ${
                                  isCurrentUser
                                    ? "bg-white text-gray-900 border-primary/20"
                                    : "bg-white text-gray-900 border-gray-200"
                                }`}
                              >
                                <a
                                  href={attachment.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm hover:underline"
                                >
                                  📎 {attachment.name}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}

                        <span className="text-xs text-gray-500 mt-1">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              disabled={isLoading}
            />
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
            >
              <Smile className="h-4 w-4" />
            </Button>
            
            <Button
              type="submit"
              size="sm"
              disabled={!newMessage.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </div>
      </CardContent>
    </Card>
  );
}
