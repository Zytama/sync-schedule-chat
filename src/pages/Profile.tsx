
import React from "react";
import Layout from "@/components/Layout";
import { Calendar, Mail, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    status: "online",
    bio: "Product Designer | Coffee Enthusiast",
    stats: {
      events: 12,
      messages: 48,
    },
  };

  const statusOptions = [
    { value: "online", label: "Online", color: "bg-green-500" },
    { value: "busy", label: "Busy", color: "bg-red-500" },
    { value: "away", label: "Away", color: "bg-amber-500" },
    { value: "offline", label: "Offline", color: "bg-gray-400" },
  ];

  // Get user status color
  const userStatus = statusOptions.find((status) => status.value === user.status);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>

        <div className="card-container flex flex-col items-center text-center space-y-3 py-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-2xl font-medium">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              )}
            </div>
            <div className="absolute bottom-0 right-0 rounded-full p-1 bg-background">
              <div className={cn("w-4 h-4 rounded-full", userStatus?.color)} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-foreground/60 text-sm">{user.bio}</p>
          </div>

          <div className="flex space-x-6 mt-2">
            <div className="text-center">
              <p className="text-xl font-semibold">{user.stats.events}</p>
              <p className="text-sm text-foreground/60">Events</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">{user.stats.messages}</p>
              <p className="text-sm text-foreground/60">Messages</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="section-title">Status</h2>
          <div className="grid grid-cols-2 gap-3">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                className={cn(
                  "card-container p-3 flex items-center space-x-2 transition-all",
                  status.value === user.status
                    ? "ring-2 ring-primary"
                    : "opacity-70"
                )}
              >
                <div className={cn("w-3 h-3 rounded-full", status.color)} />
                <span>{status.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="section-title">Account</h2>
          <div className="card-container divide-y divide-border">
            <ProfileItem icon={<User size={18} />} label="Personal Information" />
            <ProfileItem icon={<Mail size={18} />} label="Email & Notifications" />
            <ProfileItem icon={<Calendar size={18} />} label="Calendar Settings" />
            <ProfileItem icon={<MessageCircle size={18} />} label="Message Settings" />
          </div>
        </div>

        <button className="btn-secondary w-full">
          Sign Out
        </button>
      </div>
    </Layout>
  );
};

const ProfileItem = ({ 
  icon, 
  label 
}: { 
  icon: React.ReactNode; 
  label: string 
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-1 cursor-pointer">
      <div className="flex items-center space-x-3">
        <div className="text-foreground/70">{icon}</div>
        <span>{label}</span>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/50"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </div>
  );
};

export default ProfilePage;
