"use client";
import dynamic from "next/dynamic";

// Import your timestamp component but disable SSR
const RecipientChatBubble = dynamic(
  () => import("@/components/RecipientChatBubble"),
  { ssr: false }
);

const SenderChatBubble = dynamic(
  () => import("@/components/SenderChatBubble"),
  { ssr: false }
);

import { Fragment, useEffect, useRef } from "react";
import chatStore, { IncomingMessage } from "@/zustand/store";
import { socket } from "@/lib/socket";

const ChatWindow = () => {
  const addMessage = chatStore((state) => state.addMessage);
  const messages = chatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onRecievingMessages(response: IncomingMessage) {
      console.log("response: ", response);
      addMessage({ ...response, messageType: "text" });
    }

    function onUserJoinAndLeave(response: IncomingMessage) {
      addMessage({ ...response, messageType: "info" });
    }

    socket.on("user joined", onUserJoinAndLeave);
    socket.on("user left", onUserJoinAndLeave);
    socket.on("chat message", onRecievingMessages);

    return () => {
      socket.off("chat message", onRecievingMessages);
      socket.off("user left", onUserJoinAndLeave);
      socket.off("user joined", onUserJoinAndLeave);
    };
  }, [addMessage]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  console.log("messages: ", messages);
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {!messages.length ? (
        <div className="text-center text-xs text-gray-400">No messages yet</div>
      ) : null}
      {messages?.map((messageObj) =>
        messageObj.messageType === "text" ? (
          <Fragment key={messageObj?.id}>
            {messageObj.transferType === "recieved" && (
              <RecipientChatBubble
                message={messageObj?.message}
                timestamp={messageObj?.timestamp}
                username={messageObj?.username?.name}
              />
            )}
            {messageObj.transferType === "sent" && (
              <SenderChatBubble
                message={messageObj?.message}
                timestamp={messageObj?.timestamp}
              />
            )}
          </Fragment>
        ) : (
          <div
            className="text-center text-xs text-gray-400"
            key={messageObj?.id}
          >
            {messageObj?.message}
          </div>
        )
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatWindow;
