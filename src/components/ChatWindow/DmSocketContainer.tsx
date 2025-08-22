import { useEffect, useRef } from "react";

import chatStore from "@/zustand/store";

import { getSocket } from "@/lib/socket";
import { parseDmRoomName } from "@/utils/commonFunctions";

function DmSocketContainer({ decodedRoomName }: { decodedRoomName: string }) {
  const socketRef = useRef(getSocket());
  const currentUser = chatStore((state) => state.currentUser);

  useEffect(() => {
    const socket = socketRef?.current;
    const [user1, user2] = parseDmRoomName(decodedRoomName);
    const reciever = currentUser?.username !== user1 ? user1 : user2;
    console.log("currentUser?.username: ", currentUser?.username);
    console.log("decodedRoomName: ", decodedRoomName);
    if (currentUser?.username && decodedRoomName) {
      socket.emit("start_dm", { sender: currentUser?.username, reciever });
    }
  }, [currentUser?.username, decodedRoomName]);
  return null;
}

export default DmSocketContainer;
