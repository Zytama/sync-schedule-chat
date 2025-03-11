
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { addDays, format, isSameDay } from "date-fns";
import EventCard, { EventProps } from "@/components/EventCard";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  // Mock data for events
  const today = new Date();
  const mockEvents: EventProps[] = [
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly status update with the product team",
      location: "Conference Room A",
      startTime: new Date(today.setHours(10, 0, 0, 0)),
      endTime: new Date(today.setHours(11, 0, 0, 0)),
      participants: [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
        { id: "3", name: "Bob Johnson" },
        { id: "4", name: "Alice Williams" },
      ],
    },
    {
      id: "2",
      title: "Lunch with Alex",
      description: "Discussing the new project proposal",
      location: "Café Milano",
      startTime: new Date(today.setHours(12, 30, 0, 0)),
      endTime: new Date(today.setHours(13, 30, 0, 0)),
      participants: [
        { id: "1", name: "John Doe" },
        { id: "5", name: "Alex Turner" },
      ],
    },
    {
      id: "3",
      title: "UX Design Review",
      location: "Meeting Room B",
      startTime: new Date(addDays(today, 1).setHours(14, 0, 0, 0)),
      endTime: new Date(addDays(today, 1).setHours(15, 30, 0, 0)),
      participants: [
        { id: "1", name: "John Doe" },
        { id: "6", name: "Sarah Parker" },
        { id: "7", name: "Michael Chen" },
      ],
    },
  ];

  const selectedDateEvents = mockEvents.filter((event) => 
    isSameDay(event.startTime, date)
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Calendar</h1>
        </div>

        <div className="card-container">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="p-3 pointer-events-auto"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarIcon size={18} className="text-primary" />
              <h2 className="section-title">
                {format(date, "MMMM d, yyyy")}
              </h2>
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={() => setDate(addDays(date, -1))}
                className="p-1 rounded-full hover:bg-secondary"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setDate(addDays(date, 1))}
                className="p-1 rounded-full hover:bg-secondary"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3 mt-4">
              {selectedDateEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          ) : (
            <div className="card-container text-center py-6 mt-4">
              <p className="text-foreground/60">No events scheduled for this day</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
