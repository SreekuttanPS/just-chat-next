"use client";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import { getSocket } from "@/lib/socket";
import { SocketMessage, UserListItem } from "@/types/commonTypes";

import chatStore from "@/zustand/chatStore";
import { userStore } from "@/zustand/userStore";

function SocketBridge() {
  const socketRef = useRef(getSocket());

  const updateOnlineUsers = chatStore((state) => state?.updateOnlineUsers);
  const updateMainThread = chatStore((state) => state.updateMainThread);
  const updateDirectMessage = chatStore((state) => state.updateDirectMessage);
  const createDirectMessage = chatStore((state) => state.createDirectMessage);

  const currentUser = userStore((state) => state.currentUser);
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
      if (response?.type === "main") {
        updateMainThread(response?.data, currentUser?.username);
      }
    }

    function onDmStart(response: {
      reciever: string;
      roomName: string;
      showMessage: boolean;
    }) {
      if (response?.showMessage) {
        toast.success(`${response?.reciever} is in the DM`);
      }
      createDirectMessage(response?.roomName);
    }

    function onRecievingDm(response: {
      type: "main" | "direct";
      data: { roomName: string; message: SocketMessage };
    }) {
      if (response?.type === "direct") {
        updateDirectMessage(
          response?.data?.message,
          response?.data?.roomName,
          currentUser?.username
        );
      }
    }

    function onRecievingNotification(response: { message: string }) {
      toast(response?.message);
    }

    socket.on("user_joined", onRecievingMessages);
    socket.on("user_left", onRecievingMessages);
    socket.on("chat_message", onRecievingMessages);
    socket.on("get_all_users", handleUsers);
    socket.on("dm_started", onDmStart);
    socket.on("dm_message", onRecievingDm);
    socket.on("notification", onRecievingNotification);

    return () => {
      socket.off("get_all_users", handleUsers);
      socket.off("chat_message", onRecievingMessages);
      socket.off("user_left", onRecievingMessages);
      socket.off("user_joined", onRecievingMessages);
      socket.off("dm_started", onDmStart);
      socket.off("dm_message", onRecievingDm);
      socket.off("notification", onRecievingNotification);
    };
  }, [
    createDirectMessage,
    currentUser?.username,
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
