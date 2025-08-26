import { useEffect, useRef } from "react";

import { getSocket } from "@/lib/socket";
import { parseDmRoomName } from "@/utils/commonFunctions";
import { userStore } from "@/zustand/userStore";

function DmSocketContainer({ decodedRoomName }: { decodedRoomName: string }) {
  const socketRef = useRef(getSocket());
  const currentUser = userStore((state) => state.currentUser);

  useEffect(() => {
    const socket = socketRef?.current;
    const [user1, user2] = parseDmRoomName(decodedRoomName);
    const reciever = currentUser?.username !== user1 ? user1 : user2;
    if (currentUser?.username && decodedRoomName) {
      socket.emit("start_dm", { sender: currentUser?.username, reciever });
    }
  }, [currentUser?.username, decodedRoomName]);
  return null;
}

export default DmSocketContainer;
