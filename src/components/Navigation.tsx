
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, MessageCircle, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-card rounded-t-xl mx-2 mb-1 py-2 px-6 flex justify-between items-center">
        <NavItem 
          to="/" 
          isActive={isActive("/")} 
          icon={<Calendar size={22} />} 
          label="Home" 
        />
        <NavItem 
          to="/calendar" 
          isActive={isActive("/calendar")} 
          icon={<Calendar size={22} />} 
          label="Calendar" 
        />
        <div className="-mt-8">
          <Link 
            to="/new-event"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-200 active:scale-95 hover:shadow-lg animate-fade-in"
          >
            <Plus size={24} />
          </Link>
        </div>
        <NavItem 
          to="/messages" 
          isActive={isActive("/messages")} 
          icon={<MessageCircle size={22} />} 
          label="Messages" 
        />
        <NavItem 
          to="/profile" 
          isActive={isActive("/profile")} 
          icon={<User size={22} />} 
          label="Profile" 
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, isActive, icon, label }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center px-2 py-1 transition-all",
        isActive ? "text-primary" : "text-foreground/50"
      )}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default Navigation;
