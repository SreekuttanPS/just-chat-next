import Image from "next/image";

import { formatChatTimestamp } from "@/utils/commonFunctions";

import chatImage from "@/assets/chat.svg";
import ChatBubbleActions from "./ChatBubbleActions";
import { useMemo } from "react";

type Message = {
  message: string;
  timestamp: string;
  messageId: string;
};

const SenderChatBubble = ({ message, messageId, timestamp }: Message) => {
  const formattedTimestamp = useMemo(
    () => formatChatTimestamp(timestamp),
    [timestamp]
  );
  return (
    <div className="flex items-center gap-2 justify-end">
      <div>
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-none shadow-sm max-w-xs dark:from-blue-800 dark:to-blue-900 flex items-center">
          {message}
          <ChatBubbleActions messageId={messageId} position="left" />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right dark:text-gray-500">
          {formattedTimestamp}
        </div>
      </div>
      <Image src={chatImage} className="w-8 h-8 rounded-full invert" alt="" />
    </div>
  );
};

export default SenderChatBubble;
