
import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddEventButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/new-event")}
      className="fixed bottom-20 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 active:scale-95 hover:shadow-xl"
      aria-label="Add Event"
    >
      <Plus size={24} />
    </button>
  );
};

export default AddEventButton;
