
import React from "react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  avatar?: string;
  status?: "online" | "offline" | "away" | "busy";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const UserAvatar = ({
  name,
  avatar,
  status,
  size = "md",
  className,
}: UserAvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-amber-500",
    busy: "bg-red-500",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center bg-secondary text-secondary-foreground font-medium",
          sizeClasses[size]
        )}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background",
            statusColors[status],
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
          )}
        />
      )}
    </div>
  );
};

export default UserAvatar;
