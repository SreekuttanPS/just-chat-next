"use client";
import React from "react";

import Image from "next/image";

import chatImage from "@/assets/chat.svg";
import chatStore from "@/zustand/store";
import { parseDmRoomName } from "@/utils/commonFunctions";

type Props = {
  roomName: string;
};

function DirectMessageHeader({ roomName }: Props) {
  const currentUser = chatStore((state) => state?.currentUser);
  const allOnlineUsers = chatStore((state) => state?.allOnlineUsers);

  console.log('roomName: ', roomName);

  const [user1, user2] = parseDmRoomName(roomName);

  const reciever = currentUser?.username !== user1 ? user1 : user2;

  const isOnline = allOnlineUsers?.some((user) => user?.username === reciever);

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Image
          src={chatImage}
          className="w-10 h-10 rounded-full"
          alt="Recipient"
        />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 ${
            isOnline ? "bg-green-500" : "bg-red-500"
          } rounded-full border-2 border-white`}
        ></span>
      </div>
      {/* <Image
        src={chatImage}
        className="w-10 h-10 rounded-full"
        alt="Recipient"
      /> */}
      <div>
        <p className="font-semibold">@{reciever}</p>
        <p className="text-xs text-gray-500 dark:text-gray-300">
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
}

export default DirectMessageHeader;
