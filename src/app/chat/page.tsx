"use client";

import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import ChatInput from './components/ChatInput';
import './ChatPage.css';

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
        { sender: 'admin', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { sender: 'user', text: '안녕하세요! 채팅 테스트 중입니다.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [peerTyping, setPeerTyping] = useState(true);

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { sender: 'user', text: input }]);
            setInput('');
            setIsTyping(false);
        }
    };

    const handleInputChange = (value: string) => {
        setInput(value);
        setIsTyping(value.trim().length > 0);
        // socket으로 typing 이벤트 전송 예정
    };

    return (
        <div className="chat-container">
            <div className="chat-wrapper">
                <ChatBox messages={messages} isTyping={isTyping} peerTyping={peerTyping} />
                <ChatInput input={input} setInput={handleInputChange} handleSend={handleSend} />
            </div>
        </div>
    );
};

export default ChatPage;