import React, { useRef, useEffect } from 'react';
import TypingIndicator from './TypingIndicator';

interface ChatBoxProps {
    messages: { sender: string; text: string }[];
    isTyping: boolean;
    peerTyping: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, isTyping, peerTyping }) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <div className="chat-box">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`chat-message ${
                        message.sender === 'user' ? 'chat-right' : 'chat-left'
                    }`}
                >
                    <span>{message.text}</span>
                </div>
            ))}
            {peerTyping && <TypingIndicator position="left" sender="admin" />}
            {isTyping && <TypingIndicator position="right" sender="user" />}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatBox;