'use client';

import { useState } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatWindow from '@/components/ChatWindow';

export default function ChatPage() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen relative bg-[#0f172a]">
      {/* Sidebar desktop */}
      <div className="hidden md:block md:w-1/4 border-r border-gray-800">
        <ChatSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 relative overflow-hidden">
        {!showSidebar && (
          <button
            onClick={() => setShowSidebar(true)}
            className="absolute top-4 left-4 z-20 md:hidden bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 py-2 rounded-full shadow-md"
          >
            ☰ History
          </button>
        )}
        <ChatWindow />
      </div>

      {/* Sidebar mobile */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowSidebar(false)}
          ></div>

          {/* Slide-in panel */}
          <div className="absolute left-0 top-0 w-3/4 h-full bg-[#111827] shadow-lg z-50 p-4 overflow-y-auto">
            <ChatSidebar onClose={() => setShowSidebar(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
