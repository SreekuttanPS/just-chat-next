import Image from "next/image";

import chatImage from "@/assets/chat.svg";
import { formatChatTimestamp } from "@/utils/commonFunctions";

type Message = {
  message: string;
  timestamp: string;
};

const SenderChatBubble = ({ message, timestamp }: Message) => {
  const formattedTimestamp = formatChatTimestamp(timestamp);
  return (
    <div className="flex items-center gap-2 justify-end">
      <div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-none shadow-sm max-w-xs dark:from-blue-800 dark:to-blue-900">
          {message}
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
