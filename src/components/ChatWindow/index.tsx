"use client";

import { Fragment, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";

import chatStore from "@/zustand/store";

import RecipientChatBubble from "@/components/ChatWindow/RecipientChatBubble";
import SenderChatBubble from "@/components/ChatWindow/SenderChatBubble";

const ChatWindow = () => {
  const messages = chatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { roomName } = useParams();

  const decodedRoomName = roomName
    ? decodeURIComponent(roomName as string)
    : "";

  const currentMessages = useMemo(() => {
    if (decodedRoomName && typeof decodedRoomName === "string") {
      return messages?.private?.[decodedRoomName];
    }
    return messages?.mainThread;
  }, [messages, decodedRoomName]);

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
                username={messageObj?.user?.name}
                messageId={messageObj?.messageId}
                replyTo={messageObj?.replyTo}
              />
            )}
            {messageObj.transferType === "sent" && (
              <SenderChatBubble
                message={messageObj?.message}
                timestamp={messageObj?.timestamp}
                messageId={messageObj?.messageId}
                replyTo={messageObj?.replyTo}
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
