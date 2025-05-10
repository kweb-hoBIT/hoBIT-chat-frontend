import React from 'react';

interface TypingIndicatorProps {
    position: 'left' | 'right';
    sender?: 'user' | 'admin';
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ position, sender }) => {
    const positionClass = position === 'left' ? 'chat-left' : 'chat-right';
    const senderClass = sender ? `${sender}-typing` : '';

    return (
        <div className={`chat-message ${positionClass} typing-indicator ${senderClass}`}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    );
};

export default TypingIndicator;
