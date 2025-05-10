import React from 'react';

interface ChatInputProps {
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSend }) => {
    return (
        <div className="chat-input">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default ChatInput;