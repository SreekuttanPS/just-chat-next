import Image from "next/image";

import chatImage from "@/assets/chat.svg";
import UserList from "@/components/UserList";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";

export default function DashboardPage() {
  return (
    <section>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900">
        <UserList />

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
                <p className="font-semibold">Common Group</p>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  Online
                </p>
              </div>
            </div>
            {/* <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
              <button type="button">📞</button>
              <button type="button">⋮</button>
            </div> */}
          </div>

          <ChatWindow />
          <ChatInput />
        </div>
      </div>
    </section>
  );
}
