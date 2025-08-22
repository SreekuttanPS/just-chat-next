"use client";

import { getSocket } from "@/lib/socket";
import { SocketMessage, UserListItem } from "@/types/commonTypes";
import chatStore from "@/zustand/store";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

function SocketBridge() {
  const socketRef = useRef(getSocket());

  const updateOnlineUsers = chatStore((state) => state?.updateOnlineUsers);
  const updateMainThread = chatStore((state) => state.updateMainThread);
  const updateDirectMessage = chatStore((state) => state.updateDirectMessage);
  const createDirectMessage = chatStore((state) => state.createDirectMessage);

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

    function onRecievingMessages(response: {
      type: "main" | "direct";
      data: SocketMessage;
    }) {
      console.log("main response: ", response);
      if (response?.type === "main") {
        updateMainThread(response?.data);
      }
    }

    function onDmStart(reciever: string, roomName: string) {
      toast.success(`${reciever} is in the DM`);
      createDirectMessage(roomName);
    }

    function onRecievingDm(response: {
      type: "main" | "direct";
      data: { roomName: string; message: SocketMessage };
    }) {
      console.log("dm response: ", response);
      if (response?.type === "direct") {
        updateDirectMessage(response?.data?.message, response?.data?.roomName);
      }
    }

    socket.on("user_joined", onRecievingMessages);
    socket.on("user_left", onRecievingMessages);
    socket.on("chat_message", onRecievingMessages);
    socket.on("get_all_users", handleUsers);
    socket.on(
      "dm_started",
      ({ reciever, roomName }: { reciever: string; roomName: string }) => {
        onDmStart(reciever, roomName);
      }
    );
    socket.on("dm_message", onRecievingDm);

    return () => {
      socket.off("get_all_users", handleUsers);
      socket.off("chat_message", onRecievingMessages);
      socket.off("user_left", onRecievingMessages);
      socket.off("user_joined", onRecievingMessages);
      socket.off("dm_started", onDmStart);
      socket.off("dm_message", onRecievingDm);
    };
  }, [
    createDirectMessage,
    updateDirectMessage,
    updateMainThread,
    updateOnlineUsers,
  ]);

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
