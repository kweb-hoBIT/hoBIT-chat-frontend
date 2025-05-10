import React from "react";
interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
}) => {
  return (
    <div className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </div>
  );
};

export default ChatInput;
