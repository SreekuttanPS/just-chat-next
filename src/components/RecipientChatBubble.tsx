import Image from "next/image";

import chatImage from "@/assets/chat.svg";
import { formatChatTimestamp } from "@/utils/commonFunctions";

type Message = {
  message: string;
  username: string;
  timestamp: string;
};

const RecipientChatBubble = ({ message, timestamp, username }: Message) => {
  const formattedTimestamp = formatChatTimestamp(timestamp);
  return (
    <div className="flex items-center gap-2">
      <Image src={chatImage} className="w-8 h-8 rounded-full" alt="" />
      <div>
        <div>{username}</div>
        <div className="bg-gray-200 text-black px-4 py-2 rounded-2xl rounded-bl-none shadow-sm max-w-xs dark:bg-gray-800 dark:text-gray-100">
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
