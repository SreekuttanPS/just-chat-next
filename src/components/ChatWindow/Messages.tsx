"use client";
import { Fragment, useEffect, useRef } from "react";

import RecievedMessage from "./RecievedMessage";
import SentMessage from "./SentMessage";
import type { IncomingMessage } from "../../utils/types";
import chatStore from "../../zustand/store";
import { socket } from "@/lib/socket";

const Messages = () => {
  const addMessage = chatStore((state) => state.addMessage);
  const messages = chatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onRecievingMessages(response: IncomingMessage) {
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

  return (
    <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
      {!messages.length ? (
        <div className="text-center text-xs text-gray-400">No messages yet</div>
      ) : null}
      {/* Message from other */}
      {messages?.map((messageObj) =>
        messageObj.messageType === "text" ? (
          <Fragment key={messageObj?.id}>
            {messageObj.transferType === "recieved" && (
              <RecievedMessage
                message={messageObj?.message}
                username={messageObj?.username}
              />
            )}
            {messageObj.transferType === "sent" && (
              <SentMessage message={messageObj?.message} />
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

      {/* Timestamp */}
      {/* <div className="text-center text-xs text-gray-400">9:31am</div> */}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Messages;
