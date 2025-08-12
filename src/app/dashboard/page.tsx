"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import chatImage from "@/assets/chat.svg";

export default function DashboardPage() {
  const router = useRouter();
  const onLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/");
      }
    } catch {
      alert("Logout failed!");
    }
  };
  return (
    <section>
      {/* <h1 className="text-2xl font-bold p-6 text-center">
      Welcome to the Dashboard 🚀
      </h1>
      <div className="text-center">
      <button className="border px-3 py-2 cursor-pointer" onClick={onLogout}>
        Logout
      </button>
      </div> */}
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900">
      {/* Left Panel: User List */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 dark:text-gray-100 flex flex-col">
        {/* Logged-in User Bar */}
        <div className="flex items-center gap-3 p-4 sticky top-0 bg-white/10 backdrop-blur-md shadow-sm dark:bg-gray-900/30">
        <Image
          src={chatImage}
          className="w-10 h-10 rounded-full border-2 border-white"
          alt="Profile"
        />
        <div className="font-semibold">John Doe</div>
        </div>

        {/* Search Bar */}
        <div className="p-3">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-3 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-gray-100"
        />
        </div>

        {/* User List */}
        <div className="overflow-y-auto flex-1">
        {/* User Item */}
        <div className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer dark:hover:bg-gray-800/40">
          <div className="relative">
          <Image
            src={chatImage}
            className="w-10 h-10 rounded-full"
            alt="User"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <div>
          <p className="font-medium">Alice</p>
          <p className="text-xs text-white/70 dark:text-gray-300">Online</p>
          </div>
        </div>
        {/* More users here */}
        </div>
      </div>

      {/* Right Panel: Chat Section */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-950">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Image
          src={chatImage}
          className="w-10 h-10 rounded-full"
          alt="Recipient"
          />
          <div>
          <p className="font-semibold">Alice</p>
          <p className="text-xs text-gray-500 dark:text-gray-300">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
          <button type="button">📞</button>
          <button type="button">⋮</button>
        </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* Recipient Message */}
        <div className="flex items-end gap-2">
          <Image
          src={chatImage}
          className="w-8 h-8 rounded-full"
          alt=""
          />
          <div>
          <div className="bg-gray-200 text-black px-4 py-2 rounded-2xl rounded-bl-none shadow-sm max-w-xs dark:bg-gray-800 dark:text-gray-100">
            Hey! How&apos;s it going?
          </div>
          <div className="text-xs text-gray-400 mt-1 dark:text-gray-500">10:24 AM</div>
          </div>
        </div>

        {/* Sender Message */}
        <div className="flex items-end gap-2 justify-end">
          <div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-none shadow-sm max-w-xs dark:from-blue-800 dark:to-blue-900">
            Pretty good! You?
          </div>
          <div className="text-xs text-gray-400 mt-1 text-right dark:text-gray-500">
            10:25 AM
          </div>
          </div>
          <Image
          src={chatImage}
          className="w-8 h-8 rounded-full"
          alt=""
          />
        </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t flex gap-3 dark:border-gray-800">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-700 dark:focus:ring-blue-400"
        />
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Send
        </button>
        </div>
      </div>
      </div>
    </section>
  );
}
