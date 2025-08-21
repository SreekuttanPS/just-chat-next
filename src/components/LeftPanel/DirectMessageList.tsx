"use client";
import chatStore from "@/zustand/store";

import { parseDmRoomName } from "@/utils/commonFunctions";

import LeftPanelItem from "@/components/LeftPanel/LeftPanelItem";

function DirectMessageList() {
  const privateMessages = chatStore((state) => state?.messages?.private);
  const currentUser = chatStore((state) => state?.currentUser);
  const allOnlineUsers = chatStore((state) => state?.allOnlineUsers);

  return Object.keys(privateMessages || {}).map((roomName) => {
    if (!roomName || roomName === "undefined") {
      return null;
    }
    const [user1, user2] = parseDmRoomName(roomName);
    const reciever = currentUser?.username !== user1 ? user1 : user2;
    const isOnline = allOnlineUsers?.some(
      (user) => user?.username === reciever
    );

    return (
      <LeftPanelItem
        key={roomName}
        chatName={roomName}
        title={reciever}
        isOnline={isOnline}
      />
    );
  });
}

export default DirectMessageList;
