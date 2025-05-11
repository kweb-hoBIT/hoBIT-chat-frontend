import React from "react";
import "./TypingIndicator.css";
import { Sender } from "@/types";

interface TypingIndicatorProps {
  position: "left" | "right";
  sender?: Sender;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  position,
  sender,
}) => {
  const positionClass = position === "left" ? "self-start" : "self-end";
  const senderClass = sender === Sender.Self ? "self-typing" : "other-typing";

  return (
    <div className={`typing-indicator ${positionClass} ${senderClass}`}>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

export default TypingIndicator;
