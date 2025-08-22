"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import chatStore from "@/zustand/store";
import { getSocket } from "@/lib/socket";

import ReplyTextContainer from "@/components/ChatInput/ReplyTextContainer";

const ChatInput = () => {
  const router = useRouter();
  const { roomName } = useParams();
  const [input, setInput] = useState("");

  const currentUser = chatStore((state) => state.currentUser);
  const replyTo = chatStore((state) => state.replyTo);
  const decodedRoomName = roomName
    ? decodeURIComponent(roomName as string)
    : "";

  const socketRef = useRef(getSocket());
  const inputRef = useRef<HTMLInputElement>(null);

  const removeReplyMessage = chatStore((state) => state.removeReplyMessage);

  const handleSend = () => {
    const socket = socketRef.current;
    if (input.trim()) {
      if (decodedRoomName) {
        const message = {
          message: input,
          user: currentUser,
          replyTo: replyTo,
        };
        socket.emit("dm_message", { roomName: decodedRoomName, message });
      } else {
        socket.emit("chat_message", {
          message: input,
          user: currentUser,
          replyTo: replyTo,
        });
      }
      setInput("");
      inputRef.current?.focus();
      removeReplyMessage();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!currentUser?.username) {
        toast.error("Please login again!");
        router.replace("/auth/login");
      }
    }, 1000); // Waiting for the local storage to load.

    return () => clearTimeout(timeout);
  }, [currentUser?.username, router]);

  return (
    <div>
      <ReplyTextContainer />
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
          disabled={!currentUser?.username}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
