
import React from "react";
import { Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export interface EventProps {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startTime: Date;
  endTime?: Date;
  participants?: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  className?: string;
}

const EventCard = ({
  title,
  description,
  location,
  startTime,
  endTime,
  participants,
  className,
}: EventProps) => {
  return (
    <div 
      className={cn(
        "card-container interactive-card animate-scale-in", 
        className
      )}
    >
      <div className="space-y-3">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          {description && (
            <p className="text-sm text-foreground/70 mt-1 line-clamp-2">{description}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-1 text-sm text-foreground/60">
          <Clock size={14} />
          <span>
            {format(startTime, "h:mm a")}
            {endTime && ` - ${format(endTime, "h:mm a")}`}
          </span>
        </div>
        
        {location && (
          <div className="flex items-center space-x-1 text-sm text-foreground/60">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
        )}
        
        {participants && participants.length > 0 && (
          <div className="flex items-center mt-3">
            <div className="flex -space-x-2 mr-2">
              {participants.slice(0, 3).map((participant) => (
                <div 
                  key={participant.id}
                  className="w-7 h-7 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-medium overflow-hidden"
                >
                  {participant.avatar ? (
                    <img 
                      src={participant.avatar} 
                      alt={participant.name}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    participant.name.charAt(0)
                  )}
                </div>
              ))}
            </div>
            {participants.length > 3 && (
              <span className="text-xs text-foreground/60">
                +{participants.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
