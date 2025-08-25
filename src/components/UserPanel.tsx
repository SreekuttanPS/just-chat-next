"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { userStore } from "@/zustand/userStore";

import homeImage from "@/assets/user.svg";
import logoutImage from "@/assets/logout.svg";
import chatStore from "@/zustand/chatStore";
import toast from "react-hot-toast";
import Link from "next/link";

const UserPanel = () => {
  const currentUser = userStore((state) => state.currentUser);
  const resetChatState = chatStore((state) => state.resetChatState);
  const removeUser = userStore((state) => state.removeUser);

  const router = useRouter();

  const onLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Logged Out!");
        resetChatState();
        removeUser();
        router.replace("/");
      }
    } catch {
      alert("Logout failed!");
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 p-4 sticky top-0 bg-white/10 backdrop-blur-md shadow-sm dark:bg-gray-900/30">
      <div className="flex items-center gap-3">
        <Link href={"/"}>
          <Image
            src={homeImage}
            className="w-6 h-8 rounded-full dark:invert cursor-pointer"
            alt="Profile"
          />
        </Link>
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
