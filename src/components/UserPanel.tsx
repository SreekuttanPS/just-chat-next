"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import chatImage from "@/assets/chat.svg";
import logoutImage from "@/assets/logout.svg";
import chatStore from "@/zustand/store";
import toast from "react-hot-toast";

const UserPanel = () => {
  const addMessage = chatStore((state) => state.addMessage);
  const currentUser = chatStore((state) => state.currentUser);
  const resetChatState = chatStore((state) => state.resetChatState);
  const router = useRouter();

  const onLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        addMessage({
          message: `${currentUser?.username} left the chat`,
          timestamp: new Date().toISOString(),
          messageType: "info",
          username: currentUser,
        });
        toast.success("Logged Out!");
        resetChatState();
        router.push("/");
      }
    } catch {
      alert("Logout failed!");
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 p-4 sticky top-0 bg-white/10 backdrop-blur-md shadow-sm dark:bg-gray-900/30">
      <div className="flex items-center gap-3">
        <Image
          src={chatImage}
          className="w-10 h-10 rounded-full border-2 border-white"
          alt="Profile"
        />
        <div className="font-semibold">{currentUser?.name || "USER"}</div>
      </div>
      <button
        className="flex gap-1 items-center cursor-pointer"
        onClick={onLogout}
      >
        Logout{" "}
        <Image src={logoutImage} className="w-5 h-5 dark:invert" alt="Logout" />{" "}
      </button>
    </div>
  );
};

export default UserPanel;
