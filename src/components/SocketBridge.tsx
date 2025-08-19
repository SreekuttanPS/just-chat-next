"use client";

import { getSocket } from "@/lib/socket";
import { SocketMessage, UserListItem } from "@/types/commonTypes";
import chatStore from "@/zustand/store";
import { useEffect, useRef } from "react";

function SocketBridge() {
  const socketRef = useRef(getSocket());

  const updateOnlineUsers = chatStore((state) => state?.updateOnlineUsers);
  const addMessage = chatStore((state) => state.addMessage);
  const currentUser = chatStore((state) => state.currentUser);
  const allOnlineUsers = chatStore((state) => state.allOnlineUsers);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    function handleUsers(users: UserListItem[]) {
      updateOnlineUsers(users);
    }

    function onRecievingMessages(response: SocketMessage) {
      addMessage({ ...response });
    }

    socket.on("user_joined", onRecievingMessages);
    socket.on("user_left", onRecievingMessages);
    socket.on("chat_message", onRecievingMessages);
    socket.on("get_all_users", handleUsers);

    return () => {
      socket.off("get_all_users", handleUsers);
      socket.off("chat_message", onRecievingMessages);
      socket.off("user_left", onRecievingMessages);
      socket.off("user_joined", onRecievingMessages);
    };
  }, [addMessage, updateOnlineUsers]);

  useEffect(() => {
    const socket = socketRef.current;
    const isUserLoggedIn = !!currentUser?.username;
    const isUserInOnlineList = allOnlineUsers?.some(
      (user) => user?.username === currentUser?.username
    );

    if (isUserLoggedIn && !isUserInOnlineList) {
      socket.emit("register", {
        name: currentUser?.name,
        username: currentUser?.username,
      });
    }
  }, [allOnlineUsers, currentUser]);

  return null;
}

export default SocketBridge;
