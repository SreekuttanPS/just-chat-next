"use client";

import Image from "next/image";

import UserPanel from "@/components/UserPanel";

import chatImage from "@/assets/chat.svg";

const UserList = () => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 dark:text-gray-100 flex flex-col">
      {/* Logged-in User Bar */}
      <UserPanel />

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
            <p className="font-medium">Common Group</p>
            <p className="text-xs text-white/70 dark:text-gray-300">Online</p>
          </div>
        </div>
        {/* More users here */}
      </div>
    </div>
  );
};

export default UserList;
