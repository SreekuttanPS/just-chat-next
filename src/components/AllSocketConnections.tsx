"use client";

import { getSocket } from "@/lib/socket";
import { SocketMessage, UserListItem } from "@/types/commonTypes";
import chatStore from "@/zustand/store";
import { useEffect } from "react";

function AllSocketConnections() {
  const socket = getSocket();

  const updateOnlineUsers = chatStore((state) => state?.updateOnlineUsers);
  const addMessage = chatStore((state) => state.addMessage);

  useEffect(() => {
    function handleUsers(users: UserListItem[]) {
      console.log("users: ", users);
      updateOnlineUsers(users);
    }

    function onRecievingMessages(response: SocketMessage) {
      addMessage({ ...response, messageType: "text" });
    }

    function onUserJoinAndLeave(response: SocketMessage) {
      addMessage({ ...response, messageType: "info" });
    }

    socket.on("user joined", onUserJoinAndLeave);
    socket.on("user left", onUserJoinAndLeave);
    socket.on("chat message", onRecievingMessages);
    socket.on("get all users", handleUsers);

    return () => {
      socket.off("get all users", handleUsers);
      socket.off("chat message", onRecievingMessages);
      socket.off("user left", onUserJoinAndLeave);
      socket.off("user joined", onUserJoinAndLeave);
    };
  }, [addMessage, socket, updateOnlineUsers]);
  return null;
}

export default AllSocketConnections;
