"use client";
import dynamic from "next/dynamic";

import { Fragment, useEffect, useMemo, useRef } from "react";
import chatStore from "@/zustand/store";
import { IncomingMessage } from "@/types/commonTypes";
import { useParams } from "next/navigation";
import { getSocket } from "@/lib/socket";

const RecipientChatBubble = dynamic(
  () => import("@/components/RecipientChatBubble"),
  { ssr: false }
);

const SenderChatBubble = dynamic(
  () => import("@/components/SenderChatBubble"),
  { ssr: false }
);

const ChatWindow = () => {
  const socket = getSocket();

  const addMessage = chatStore((state) => state.addMessage);
  const messages = chatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { directMessageId } = useParams();

  const currentMessages = useMemo(() => {
    if (directMessageId && typeof directMessageId === "string") {
      return messages?.private?.[directMessageId];
    }
    return messages?.mainThread;
  }, [messages, directMessageId]);

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
  }, [currentMessages]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  console.log("messages: ", currentMessages);
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {!currentMessages?.length ? (
        <div className="text-center text-xs text-gray-400">No messages yet</div>
      ) : null}
      {currentMessages?.map((messageObj) =>
        messageObj.messageType === "text" ? (
          <Fragment key={messageObj?.messageId}>
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
            key={messageObj?.messageId}
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
