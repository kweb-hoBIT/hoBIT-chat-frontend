import React from "react";
import "./TypingIndicator.css";

interface TypingIndicatorProps {
  position: "left" | "right";
  sender?: "user" | "admin";
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  position,
  sender,
}) => {
  const positionClass = position === "left" ? "self-start" : "self-end";
  const senderClass = sender === "user" ? "user-typing" : "admin-typing";

  return (
    <div
      className={`typing-indicator ${positionClass} ${senderClass}`}
    >
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

export default TypingIndicator;
