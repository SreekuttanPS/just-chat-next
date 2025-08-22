import React from "react";
import { useParams } from "next/navigation";

import Tooltip from "@/components/Tooltip";
import chatStore from "@/zustand/store";

const ChatBubbleActions = ({
  messageId,
  position,
}: {
  messageId: string;
  position: "left" | "right";
}) => {
  const addReplyMessage = chatStore((state) => state.addReplyMessage);
  const { roomName } = useParams();
  const decodedRoomName = roomName
    ? decodeURIComponent((roomName || "") as string)
    : "";

  const className =
    position === "left"
      ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white dark:from-blue-900 dark:to-blue -left-28 -top-5"
      : "bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-700 dark:to-gray-800 left-8 -top-5";

  const handleReplyText = () => {
    if (decodedRoomName) {
      addReplyMessage(messageId, decodedRoomName);
    } else {
      addReplyMessage(messageId);
    }
  };

  return (
    <Tooltip
      className={className}
      trigger={
        <button
          className="px-3 py-1 text-black dark:text-white rounded"
          type="button"
        >
          ⋮
        </button>
      }
    >
      <div className="min-w-20">
        <button className="rounded text-white w-full" onClick={handleReplyText}>
          Reply
        </button>
      </div>
    </Tooltip>
  );
};

export default ChatBubbleActions;
