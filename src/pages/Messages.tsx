
import React, { useState } from "react";
import Layout from "@/components/Layout";
import UserAvatar from "@/components/UserAvatar";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatProps {
  id: string;
  name: string;
  avatar?: string;
  status?: "online" | "offline" | "away" | "busy";
  lastMessage: string;
  time: Date;
  unread: number;
}

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for chats
  const mockChats: ChatProps[] = [
    {
      id: "1",
      name: "Jane Smith",
      status: "online",
      lastMessage: "Can we reschedule our meeting to 3pm?",
      time: new Date(new Date().setHours(new Date().getHours() - 1)),
      unread: 2,
    },
    {
      id: "2",
      name: "Alex Turner",
      status: "offline",
      lastMessage: "I've shared the presentation with you",
      time: new Date(new Date().setDate(new Date().getDate() - 1)),
      unread: 0,
    },
    {
      id: "3",
      name: "Michael Chen",
      status: "away",
      lastMessage: "Let me know when you're free to discuss the project",
      time: new Date(new Date().setDate(new Date().getDate() - 2)),
      unread: 0,
    },
    {
      id: "4",
      name: "Sarah Parker",
      status: "online",
      lastMessage: "I'll be joining the call in 5 minutes",
      time: new Date(new Date().setDate(new Date().getDate() - 3)),
      unread: 1,
    },
  ];

  const filteredChats = searchQuery 
    ? mockChats.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockChats;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Messages</h1>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-foreground/50" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            className="input-field pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <ChatListItem key={chat.id} {...chat} />
            ))
          ) : (
            <div className="card-container text-center py-6">
              <p className="text-foreground/60">No conversations found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const ChatListItem = ({ name, avatar, status, lastMessage, time, unread }: ChatProps) => {
  const formattedTime = () => {
    const now = new Date();
    const messageDate = new Date(time);
    
    if (messageDate.toDateString() === now.toDateString()) {
      return format(messageDate, "h:mm a");
    } else if (
      messageDate.toDateString() === 
      new Date(now.setDate(now.getDate() - 1)).toDateString()
    ) {
      return "Yesterday";
    } else {
      return format(messageDate, "MMM d");
    }
  };

  return (
    <div className="card-container interactive-card cursor-pointer flex items-center justify-between p-3">
      <div className="flex items-center space-x-3">
        <UserAvatar name={name} avatar={avatar} status={status} />
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-foreground/60 line-clamp-1">{lastMessage}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs text-foreground/50">{formattedTime()}</span>
        {unread > 0 && (
          <span className="mt-1 text-xs text-white bg-primary rounded-full w-5 h-5 flex items-center justify-center">
            {unread}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
