"use client";

import { getSocket } from "@/lib/socket";
import { SocketMessage, UserListItem } from "@/types/commonTypes";
import chatStore from "@/zustand/store";
import { useEffect } from "react";

function AllSocketConnections() {
  const socket = getSocket();

  const updateOnlineUsers = chatStore((state) => state?.updateOnlineUsers);
  const addMessage = chatStore((state) => state.addMessage);
  const currentUser = chatStore((state) => state.currentUser);
  const allOnlineUsers = chatStore((state) => state.allOnlineUsers);

  useEffect(() => {
    function handleUsers(users: UserListItem[]) {
      console.log("users: ", users);
      updateOnlineUsers(users);
    }

    function onRecievingMessages(response: SocketMessage) {
      addMessage({ ...response });
    }

    function onUserLeft(response: SocketMessage) {
      console.log("user left: ", response);
      addMessage({ ...response });
    }

    socket.on("user joined", onRecievingMessages);
    socket.on("user left", onUserLeft);
    socket.on("chat message", onRecievingMessages);
    socket.on("get all users", handleUsers);

    return () => {
      socket.off("get all users", handleUsers);
      socket.off("chat message", onRecievingMessages);
      socket.off("user left", onUserLeft);
      socket.off("user joined", onRecievingMessages);
    };
  }, [addMessage, socket, updateOnlineUsers]);

  useEffect(() => {
    const isUserLoggedIn = !!currentUser?.username;
    const isUserInOnlineList = allOnlineUsers?.some(
      (user) => user?.username === currentUser?.username
    );

    console.log("condition: ", isUserLoggedIn && !isUserInOnlineList);

    if (isUserLoggedIn && !isUserInOnlineList) {
      console.log("hit");
      socket.emit("register", {
        name: currentUser?.name,
        username: currentUser?.username,
      });
    }

    return () => {
      socket.off("register");
    };
  }, [allOnlineUsers, currentUser, socket]);

  return null;
}

export default AllSocketConnections;
