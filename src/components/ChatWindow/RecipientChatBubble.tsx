import Image from "next/image";

import ChatBubbleActions from "@/components/ChatWindow/ChatBubbleActions";

import { formatChatTimestamp } from "@/utils/commonFunctions";

import chatImage from "@/assets/chat.svg";
import { useMemo } from "react";

type Message = {
  message: string;
  username: string;
  timestamp: string;
  messageId: string;
};

const RecipientChatBubble = ({
  message,
  timestamp,
  username,
  messageId,
}: Message) => {
  const formattedTimestamp = useMemo(
    () => formatChatTimestamp(timestamp),
    [timestamp]
  );
  return (
    <div className="flex items-center gap-2">
      <Image src={chatImage} className="w-8 h-8 rounded-full" alt="" />
      <div>
        <div>{username}</div>
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 text-black px-4 py-2 rounded-2xl rounded-bl-none shadow-sm max-w-xs dark:bg-gray-800 dark:text-gray-100 flex items-center">
          <ChatBubbleActions messageId={messageId} position="right" />
          {message}
        </div>
        <div className="text-xs text-gray-400 mt-1 dark:text-gray-500">
          {formattedTimestamp}
        </div>
      </div>
    </div>
  );
};

export default RecipientChatBubble;
