'use client';

import { useEffect, useRef, useState } from "react";
import "./ChatWindow.css";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you?" },
    { from: "user", text: "C’est quoi l’ESTIN ?" },
    { from: "user", text: "How tangst" },
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input.trim() }]);
    setInput("");
  };

  return (
    <section className="chat-window-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-row ${msg.from === "user" ? "user" : "bot"}`}>
            <img
              src={msg.from === "user" ? "/user.svg" : "/bot.png"}
              alt={`${msg.from} avatar`}
              className="avatar"
            />
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </section>
  );
}
