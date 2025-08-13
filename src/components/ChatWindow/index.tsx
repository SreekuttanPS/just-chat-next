"use client";

import { Fragment, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";

import { IncomingMessage } from "@/types/commonTypes";

import { getSocket } from "@/lib/socket";
import chatStore from "@/zustand/store";

import RecipientChatBubble from "@/components/ChatWindow/RecipientChatBubble";
import SenderChatBubble from "@/components/ChatWindow/SenderChatBubble";

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
  }, [addMessage, socket]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

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
                messageId={messageObj?.messageId}
              />
            )}
            {messageObj.transferType === "sent" && (
              <SenderChatBubble
                message={messageObj?.message}
                timestamp={messageObj?.timestamp}
                messageId={messageObj?.messageId}
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
