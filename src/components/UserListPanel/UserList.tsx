"use client";
import Image from "next/image";

import { getDmRoomName } from "@/utils/commonFunctions";
import chatStore from "@/zustand/chatStore";

import chatImage from "@/assets/chat.svg";
import Link from "next/link";
import { userStore } from "@/zustand/userStore";

function UserList() {
  const allOnlineUsers = chatStore((state) => state?.allOnlineUsers);
  const currentUser = userStore((state) => state?.currentUser);

  return (
    <section className="mt-8">
      <header className="px-5 py-3 text-sm font-medium">
        {allOnlineUsers?.length || 0} online users
      </header>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800">
        {/* <li className="flex items-center gap-4 px-5 py-4">
          <Image src={chatImage} alt="" className="h-10 w-10 rounded-xl" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Design system tokens</p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              8 tasks • Updated 2h ago
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-xl border border-gray-200 px-2.5 py-1.5 text-xs font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
              View
            </button>
            <button className="rounded-xl bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900">
              Edit
            </button>
          </div>
        </li> */}
        {allOnlineUsers?.map((user) => (
          <li
            className="flex items-center gap-4 px-5 py-4"
            key={user?.username}
          >
            <Image src={chatImage} alt="" className="h-10 w-10 rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {user?.name}
                {currentUser?.username === user?.username ? " (You)" : null}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                @{user?.username}
              </p>
            </div>
            {currentUser?.username !== user?.username ? (
              <div className="flex items-center gap-2">
                <Link
                  href={`/chat/dm/${getDmRoomName(
                    currentUser?.username,
                    user?.username
                  )}`}
                  className="rounded-xl border border-gray-200 px-2.5 py-1.5 text-xs font-medium bg-gray-400 hover:bg-gray-500 dark:border-gray-800 dark:hover:bg-gray-500"
                >
                  Chat
                </Link>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default UserList;
