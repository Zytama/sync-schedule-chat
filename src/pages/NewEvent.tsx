
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Clock, MapPin, Plus, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";

const NewEventPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  
  // Mock users for selection
  const mockUsers = [
    { id: "1", name: "Jane Smith", status: "online" },
    { id: "2", name: "Alex Turner", status: "offline" },
    { id: "3", name: "Michael Chen", status: "away" },
    { id: "4", name: "Sarah Parker", status: "online" },
  ];

  const [selectedUsers, setSelectedUsers] = useState<typeof mockUsers>([]);

  const handleAddUser = (user: typeof mockUsers[0]) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleCreateEvent = () => {
    // Here you would implement the event creation logic
    // Then navigate back
    navigate("/");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">New Event</h1>
          <button onClick={handleCancel} className="text-foreground/60">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Event title"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description" className="label">
              Description (optional)
            </label>
            <textarea
              id="description"
              placeholder="Event description"
              className="input-field min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-full flex items-center justify-between text-left input-field",
                    !date && "text-foreground/50"
                  )}
                >
                  <div className="flex items-center">
                    <CalendarIcon size={18} className="mr-2 text-foreground/70" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="label">
                Start Time
              </label>
              <div className="relative">
                <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/70" />
                <input
                  id="startTime"
                  type="time"
                  className="input-field pl-10"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="endTime" className="label">
                End Time
              </label>
              <div className="relative">
                <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/70" />
                <input
                  id="endTime"
                  type="time"
                  className="input-field pl-10"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="location" className="label">
              Location (optional)
            </label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/70" />
              <input
                id="location"
                type="text"
                placeholder="Add location"
                className="input-field pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="label">Participants</label>
            <div className="card-container p-3">
              {selectedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedUsers.map((user) => (
                    <div 
                      key={user.id}
                      className="flex items-center space-x-2 bg-secondary rounded-full py-1 pl-1 pr-2"
                    >
                      <UserAvatar name={user.name} status={user.status as any} size="sm" />
                      <span className="text-sm">{user.name}</span>
                      <button 
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-foreground/60 hover:text-foreground"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="space-y-2">
                <p className="text-sm text-foreground/70">Add participants:</p>
                <div className="space-y-2 max-h-[150px] overflow-y-auto scrollbar-none">
                  {mockUsers
                    .filter(user => !selectedUsers.find(u => u.id === user.id))
                    .map((user) => (
                      <div 
                        key={user.id}
                        onClick={() => handleAddUser(user)}
                        className="flex items-center justify-between p-2 hover:bg-secondary rounded-lg cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <UserAvatar name={user.name} status={user.status as any} size="sm" />
                          <span>{user.name}</span>
                        </div>
                        <Plus size={16} className="text-foreground/60" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button onClick={handleCancel} className="btn-ghost flex-1">
            Cancel
          </button>
          <button onClick={handleCreateEvent} className="btn-primary flex-1">
            Create Event
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewEventPage;
