
import React from "react";
import Layout from "@/components/Layout";
import EventCard, { EventProps } from "@/components/EventCard";
import { addDays, format } from "date-fns";
import { Calendar } from "lucide-react";

const Index = () => {
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

  const todayEvents = mockEvents.filter(
    (event) => format(event.startTime, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
  );
  
  const upcomingEvents = mockEvents.filter(
    (event) => format(event.startTime, "yyyy-MM-dd") !== format(today, "yyyy-MM-dd")
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Schedule</h1>
          <span className="text-foreground/60">{format(today, "EEEE, MMMM d")}</span>
        </div>

        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Calendar size={18} className="text-primary" />
            <h2 className="section-title">Today</h2>
          </div>
          {todayEvents.length > 0 ? (
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          ) : (
            <div className="card-container text-center py-6">
              <p className="text-foreground/60">No events scheduled for today</p>
            </div>
          )}
        </section>

        {upcomingEvents.length > 0 && (
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar size={18} className="text-primary" />
              <h2 className="section-title">Upcoming</h2>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Index;
