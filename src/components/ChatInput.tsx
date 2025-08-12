"use client";

import { getSocket } from "@/lib/socket";
import chatStore from "@/zustand/store";
import React, { useRef, useState } from "react";

const ChatInput = () => {
  const socket = getSocket();

  const [input, setInput] = useState("");
  const currentUser = chatStore((state) => state.currentUser);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      socket.emit("chat message", {
        message: input,
        username: currentUser,
      });
      setInput("");
      inputRef.current?.focus();
    }
  };
  return (
    <div className="p-4 border-t flex gap-3 dark:border-gray-800">
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => (e.key === "Enter" ? handleSend() : null)}
        type="text"
        name="message"
        id="message"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-700 dark:focus:ring-blue-400"
      />
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
