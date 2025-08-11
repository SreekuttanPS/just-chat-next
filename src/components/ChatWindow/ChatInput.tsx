"use client";
import { useRef, useState } from "react";

import chatStore from "../../zustand/store";
import { socket } from "@/lib/socket";

const ChatInput = () => {
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
    <div className="p-4 border-t bg-white dark:bg-gray-800 dark:text-gray-300 flex items-center gap-2">
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => (e.key === "Enter" ? handleSend() : null)}
        type="text"
        name="message"
        id="message"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 dark:text-gray-300 focus:ring-blue-400"
      />
      <button
        className="text-gray-500 hover:text-blue-600 scale-200 mx-5 px-3 bg-green-400 rounded-2xl"
        aria-label="Send Message"
        onClick={handleSend}
      >
        ➤
      </button>
      {/* <button className="text-gray-500 hover:text-blue-600" aria-label="Emoji">
        😊
      </button> */}
    </div>
  );
};

export default ChatInput;
