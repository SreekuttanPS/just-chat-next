import { useMemo } from "react";
import Image from "next/image";

import { formatChatTimestamp } from "@/utils/commonFunctions";

import ChatBubbleActions from "@/components/ChatWindow/ChatBubbleActions";

import chatImage from "@/assets/chat.svg";
import { SocketMessage } from "@/types/commonTypes";

type Message = {
  message: string;
  timestamp: string;
  messageId: string;
  replyTo: SocketMessage["replyTo"];
};

const SenderChatBubble = ({
  message,
  messageId,
  timestamp,
  replyTo,
}: Message) => {
  const formattedTimestamp = useMemo(
    () => formatChatTimestamp(timestamp),
    [timestamp]
  );

  return (
    <div className="flex items-center gap-2 justify-end">
      <div>
        {replyTo ? (
          <div
            className={`
            bg-gradient-to-r 
          from-blue-700 
          to-blue-500 
          text-white 
            px-4 
            py-2 
            rounded-2xl 
            rounded-br-none 
            rounded-bl-none 
            shadow-sm 
            max-w-xs
          dark:from-blue-800
          dark:to-blue-900
          `}
          >
            <div
              className={`
                flex
                flex-col
                px-2
                border-l-2
              border-gray-500
                italic
                bg-gradient-to-r
              from-black/30
              dark:from-black/50
                to-black-500
              `}
            >
              <div className="text-gray-300">{replyTo?.name}</div>
              <div>{replyTo?.message}</div>
            </div>
          </div>
        ) : null}
        <div
          className={`
            bg-gradient-to-r
          from-blue-700
          to-blue-500
          text-white
            px-4
            py-2
            rounded-2xl
            shadow-sm
            max-w-xs
          dark:from-blue-800
          dark:to-blue-900
            flex items-center
            justify-between
            ${replyTo ? "rounded-t-none" : "rounded-br-none"}
          `}
        >
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
