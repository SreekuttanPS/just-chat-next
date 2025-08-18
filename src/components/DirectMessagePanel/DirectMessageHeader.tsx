import React from "react";

import Image from "next/image";

import chatImage from "@/assets/chat.svg";

type Props = {
  title: string;
  isOnline: boolean;
};

function DirectMessageHeader({ isOnline, title }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={chatImage}
        className="w-10 h-10 rounded-full"
        alt="Recipient"
      />
      <div>
        <p className="font-semibold">{title}</p>
        {isOnline ? (
          <p className="text-xs text-gray-500 dark:text-gray-300">Online</p>
        ) : null}
      </div>
    </div>
  );
}

export default DirectMessageHeader;
